import prisma from "../_db/prisma";
import projectSchema from "../1. validation/7. project-schema";
import {
  deleteFromCloudinary,
  getCloudinaryUrl,
} from "../_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "../_lib/helpers/function";
import { TQueryParamsPaginationList } from "../_lib/types";
import { CategoryProject, Prisma, Project, ProjectTechStack, TypeProject } from "@prisma/client";

type TParamsListProjectDto = TQueryParamsPaginationList<keyof Project> & {
  id_user: string;
  categories?: string;
  types?: TypeProject;
  id_skills?: string;
  keyword?: string;
  username?: string;
};

export const getListProjectService = async (params: TParamsListProjectDto) => {
  const {
    page_no = 1,
    items_perpage = 10,
    sort_by = "created_at",
    sort_dir = "desc",
    id_user,
    categories,
    types,
    id_skills,
    keyword,
  } = params;

  const skip = (page_no - 1) * items_perpage;
  const take = items_perpage;

  const listIdSkill =id_skills? id_skills?.split(",") :[]
  const listCategory = categories? (categories?.split(",") as CategoryProject[]) : [];
  const listType = types? (types?.split(",") as TypeProject[]) : [];

  const whereFilter: Prisma.ProjectWhereInput = {
    ...(id_user && { id_user }),
    AND: [
      {
        OR: [
          {
            name: {
              contains: keyword || '',
              mode: 'insensitive',
            },
            
          },
          {
            experiance: {
              company: {
                name: {
                  contains: keyword || '',
                  mode: 'insensitive',
                },
              },
            },
          },
          {
            tech_stacks: {
              some: {
                skill_user: {
                  skill: {
                    name: {
                      contains: keyword,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          },
          {
            tech_stacks: {
              some: {
                skill_user: {
                  skill: {
                    category: {
                      name: {
                        contains: keyword,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      ...(listIdSkill.length > 0
        ? [
            {
              tech_stacks: {
                some: {
                  skill_user: {
                    skill: {
                      id: {
                        in: listIdSkill,
                      },
                    },
                  },
                },
              },
            },
          ]
      : []),
      ...(listCategory.length
        ? [
            {
              category: {
                in: listCategory,
              },
            },
          ]
        : []),

      ...(listType.length
        ? [
            {
              type: {
                in: listType,
              },
            },
          ]
        : []),
    ],
  };


  const relationOrderMap: Record<string, Prisma.ProjectOrderByWithRelationInput> = {
  };

  const orderBy: Prisma.ProjectOrderByWithRelationInput | undefined =
    sort_by
      ? relationOrderMap[sort_by as string] || { [sort_by as keyof Prisma.ProjectOrderByWithRelationInput]: sort_dir }
      : undefined;    

  const result = await prisma.project.findMany({
    ...(page_no && items_perpage
        ? { skip, take }
        : {}),
    where: whereFilter,
    orderBy,
    include: {
      experiance: {
        select: {
          id: true,
          company: { select: { id: true, name: true,  } },
          start_at:true,
          end_at: true,
          profession : true
        },
      },
      tech_stacks: {
        select: {
          id: true,
          skill_user: {
            include: {
              skill: { select: { id: true, name: true, color: true } },
            },
          },
        },
      },
    },
  });

  const items = await Promise.all(
    result.map(async (project) => {
      const thumbnail_image = project.thumbnail_image
        ? await getCloudinaryUrl({ publicId: project.thumbnail_image })
        : null;

      return {
        ...project,
        thumbnail_image,
        tech_stacks: project.tech_stacks?.map((techStack) => ({
          id: techStack.id,
          id_skill: techStack.skill_user?.skill?.id,
          name: techStack.skill_user?.skill?.name,
          color: techStack.skill_user?.skill?.color,
        })),
        company_name : project.experiance?.company.name
      };
    })
  );

  const totalItems = await prisma.project.count({ where: whereFilter });
  const totalPages = Math.ceil(totalItems / (items_perpage || 1));

  return {
    items,
    total_items: totalItems,
    total_pages: totalPages,
    current_page: page_no,
  };
};

export const upsertProjectService = async (
  params: Project & { id_skill_users: string[] }
) => {
  const id = params.id;

  const projectDto = trimObject({
    name: params.name,
    thumbnail_image: params.thumbnail_image,
    description: params.description,
    category: params.category,
    type: params.type,
    id_experiance: params.id_experiance,
    id_user: params.id_user,
    id_profession:params?.id_profession,
    start_at : params?.start_at,
    end_at : params?.end_at
  });

  await validationParse({
    schema: projectSchema(!id),
    data: projectDto,
  });


  if (id && params.thumbnail_image) {
    const existing = await prisma.project.findUnique({
      where: { id },
    });

    if (existing?.thumbnail_image) {
      await deleteFromCloudinary({
        publicId: existing.thumbnail_image,
      });
    }
  }

  const project = id
    ? await prisma.project.update({
        where: { id },
        data: removeKeyWithUndifienedValue(projectDto),
      })
    : await prisma.project.create({
        data: projectDto,
      });


  if (params.id_skill_users?.length) {
    await prisma.$transaction([
      prisma.projectTechStack.deleteMany({
        where: {
          id_project: project.id,
          id_skill_user: {
            notIn: params.id_skill_users,
          },
        },
      }),

      ...params.id_skill_users.map((id_skill_user) =>
        prisma.projectTechStack.upsert({
          where: {
            id_project_id_skill_user: {
              id_project: project.id,
              id_skill_user,
            },
          },
          update: {},
          create: {
            id_project: project.id,
            id_skill_user,
          },
        })
      ),
    ]);
  }

  return project;
};

export const getProjectByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.project?.findUnique({
    where: {
      id,
    },
    include: {
      experiance: {
        select: {
          id: true,
          company: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      tech_stacks: {
        select: {
          id: true,
          skill_user: {
            include: {
              skill: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const skill_images = Array.isArray(result?.tech_stacks)
    ? await Promise.all(
        result?.tech_stacks?.map(async (tech_stack) => {
          const skill_image = await getCloudinaryUrl({
            publicId: tech_stack?.skill_user?.skill?.image,
          });
          return skill_image;
        })
      )
    : [];
  const thumbnail_image = await getCloudinaryUrl({
    publicId: result?.thumbnail_image || "",
  });
  const resultDto = {
    ...result,
    thumbnail_image,
    tech_stacks: result?.tech_stacks?.map((techStack, i) => ({
      id: techStack?.id,
      id_skill: techStack?.skill_user?.skill?.id,
      name: techStack?.skill_user?.skill?.name,
      color: techStack?.skill_user?.skill?.color,
      image: skill_images[i],
    })),
    id_skill_users : result?.tech_stacks?.map((techStack)=>techStack?.skill_user.id)
  };

  return result ? resultDto : null;
};

export const deleteProjectByIdService = async (param: string) => {
  const id = param;

  return await prisma.$transaction(async (tx) => {
    const menus = await tx.projectMenu.findMany({
      where: { id_project: id },
      select: { id: true },
    });

    const menuIds = menus.map((m) => m.id);

    if (menuIds.length) {
      await tx.projectMenuRelatedImage.deleteMany({
        where: {
          id_project_menu: { in: menuIds },
        },
      });
    }

    await tx.projectMenu.deleteMany({
      where: { id_project: id },
    });

    await tx.projectTechStack.deleteMany({
      where: { id_project: id },
    });

    return await tx.project.delete({
      where: { id },
    });
  });
};
