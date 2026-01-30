import { CategoryProject, Prisma, Project, TypeProject } from "@prisma/client";
import projectSchema from "../1. validation/7. project-schema";
import prisma from "../_db/prisma";
import {
  deleteFromCloudinary,
  getCloudinaryUrl,
} from "../_lib/helpers/claudinary";
import {
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse
} from "../_lib/helpers/function";
import { TQueryParamsPaginationList } from "../_lib/types";

export type TParamsListProjectDto = TQueryParamsPaginationList<keyof Project> & {
  id_user: string;
  categories?: string;
  types?: TypeProject;
  id_skills?: string;
  keyword?: string;
  username?: string;
  is_show?: string;
};

export const getListProjectService = async (params: TParamsListProjectDto) => {
  const {
    page_no = 1,
    items_perpage = 10,
    sort_by = "start_at",
    sort_dir = "desc",
    id_user,
    categories,
    types,
    id_skills,
    keyword,
    is_show,
    username
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
      (is_show ? {
          is_show : is_show==="true"
      } : {}),
      (username ? {
          user: {
            username
          }
        } : {}
      )
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
      profession:true,
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
      project_links: true,
      project_menus: {
        select: {
          related_images:true
        }
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
  params: Omit<Project, "is_show"> & { id_skill_users: string[];is_show:string }
) => {
  const id = params.id;
  const updateParams = removeKeyWithUndifienedValue(params)
  const scalarDto = trimObject({
    name: updateParams.name,
    thumbnail_image: updateParams.thumbnail_image,
    description: updateParams.description,
    category: updateParams.category,
    type: updateParams.type,
    start_at: updateParams.start_at,
    end_at: updateParams.end_at,
    is_show:updateParams?.is_show==="true"
  });

  await validationParse({
    schema: projectSchema(!id),
    data: {
      ...scalarDto,
      id_experiance: params.id_experiance,
      id_user: params.id_user,
      id_profession: params.id_profession,
    },
  });

  if (id && params.thumbnail_image) {
    const existing = await prisma.project.findUnique({ where: { id } });

    if (existing?.thumbnail_image) {
      await deleteFromCloudinary({
        publicId: existing.thumbnail_image,
      });
    }
  }

  const prismaData = {
    ...removeKeyWithUndifienedValue(scalarDto) as typeof scalarDto,
    ...(params.id_experiance && {
      experiance: {
        connect: { id: params.id_experiance },
      },
    }),
    ...(params?.id_user && {
      user: {
        connect: { id: params.id_user },
      },
    }),
    ...(params?.id_profession && {
      profession: {
        connect: { id: params.id_profession },
      },
    })


  };

  const project = id
    ? await prisma.project.update({
        where: { id },
      data: {
          ...prismaData
        },
      })
    : await prisma.project.create({
        data: prismaData as unknown as any,
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
      profession: true,
      project_responsibilities: {
        orderBy: {
          created_at: 'asc',
        }
      },
      project_links: true,
      project_menus:{
        include: {
          related_images:true
        },
        orderBy: {
          created_at: 'asc',
        }
      }
    },
  });

  const techStacks = result?.tech_stacks
    ? await Promise.all(
        result.tech_stacks.map(async (skill) => ({
          ...skill,
          image: await getCloudinaryUrl({ publicId: skill.skill_user.skill.image })
        }))
      )
    : [];

    

  const thumbnail_image = await getCloudinaryUrl({
    publicId: result?.thumbnail_image || "",
  });

  const projectMenus = result?.project_menus? await Promise.all(result?.project_menus?.map(async(projectMenu) => {
    const mainImage = await getCloudinaryUrl({
      publicId: projectMenu.main_image,
    });

    const realtedImages = await Promise.all(projectMenu?.related_images?.map(async (relatedImage) => {
      const img = await getCloudinaryUrl({
        publicId: relatedImage.image,
      });
      return {
        ...relatedImage,
        image: img
      }
    }))
    return {
      ...projectMenu,
      main_image: mainImage,
      related_images : realtedImages
    }
  })):[]
  const resultDto = {
    ...result,
    thumbnail_image,
    tech_stacks: techStacks,
    id_skill_users: techStacks?.map((techStack) => techStack?.skill_user.id),
    project_menus : projectMenus
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
