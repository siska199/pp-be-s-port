import prisma from "@_db/prisma";
import projectSchema from "@1. validation/7. project-schema";
import {
  deleteFromCloudinary,
  getCloudinaryUrl,
} from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { TQueryParamsPaginationList } from "@_lib/types";
import { CategoryProject, Prisma, Project, ProjectTechStack, TypeProject } from "@prisma/client";

type TParamsListProjectDto = TQueryParamsPaginationList<keyof Project> & {
  id_user: string;
  categories?: string;
  types?: TypeProject;
  id_skills?: string;
  keyword?: string;
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

  const listIdSkill = id_skills?.split(",") || [];
  const listCategory = (categories?.split(",") as CategoryProject[]) || [];
  const listType = (types?.split(",") as TypeProject[]) || [];

  const whereFilter:  Prisma.ProjectWhereInput = {
    ...(id_user && { id_user }),
    AND: [
      ...(keyword
        ? [
            {
              OR: [
                { name: { contains: keyword as string, mode: "insensitive" as Prisma.QueryMode } },
                {
                  experiance: {
                    company: { name: { contains: keyword as string, mode: "insensitive" as Prisma.QueryMode } },
                  },
                },
              ],
            } as Prisma.ProjectWhereInput,
          ]
        : []),
      ...(listIdSkill.length
        ? [
            {
              OR: listIdSkill.map((id_skill) => ({
                tech_stacks: { some: { skill_user: { skill : {id:id_skill} } } },
              })) as Prisma.ProjectWhereInput[],
            } as Prisma.ProjectWhereInput,
          ]
        : []),
      ...(listCategory.length
        ? [
            {
              OR: listCategory.map((category) => ({ category: { equals: category } })) as Prisma.ProjectWhereInput[],
            } as Prisma.ProjectWhereInput,
          ]
        : []),
      ...(listType.length
        ? [
            {
              OR: listType.map((type) => ({ type: { equals: type } })) as Prisma.ProjectWhereInput[],
            } as Prisma.ProjectWhereInput,
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
          company: { select: { id: true, name: true } },
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
  const id = params.id ?? "";
  let dataDto = trimObject({
    ...(id && { id }),
    name: params?.name,
    thumbnail_image: params?.thumbnail_image,
    description: params?.description,
    category: params?.category,
    type: params?.type,
    id_experiance: params?.id_experiance,
    id_user: params?.id_user,
    id_skill_users: params?.id_skill_users,
    tech_stacks: {
      create: params?.id_skill_users?.map((id_skill_user:string) => ({
        skill_user: {
          connect: {
            id: id_skill_user,
          },
        },
      })),
    },
  });

  await validationParse({
    schema: projectSchema(!id),
    data: filterKeysObject({
      object: { ...dataDto },
      keys: ["tech_stacks"],
    }),
  });

  if (id && dataDto?.thumbnail_image) {
    const existingData = await prisma?.project?.findUnique({
      where: {
        id,
      },
    });
    await deleteFromCloudinary({
      publicId:existingData?.thumbnail_image || ""
    });
  }

  const result = id
    ? await prisma?.project?.update({
        where: {
          id,
        },

        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id_user", "id_skill_users", "id"],
        }),
      })
    : await prisma?.project?.create({
        data: {
          ...filterKeysObject({
            object: dataDto,
            keys: ["id_skill_users"],
          }),
        },
      });

  const resultDto = result;
  return result ? resultDto : null;
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

  const result = await prisma?.project?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;

  return result ? resultDto : null;
};
