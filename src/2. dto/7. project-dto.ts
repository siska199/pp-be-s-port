import prisma from "@0 db/prisma";
import projectSchema from "@1. validation/7. project-schema";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
  validationParse,
} from "@_lib/helpers/function";
import { TQueryParamsPaginationList } from "@_lib/types";
import { CategoryProject, Project, TypeProject } from "@prisma/client";

type TParamsListProjectDto = TQueryParamsPaginationList<keyof Project> & {
  id_user: string;
  categories?: string;
  types?: TypeProject;
  id_skills?: string;
  search?: string;
};

export const getListProjectDto = async (params: TParamsListProjectDto) => {
  const {
    page_no,
    items_perpage,
    sort_by = "created_at",
    sort_dir = "desc",
    id_user,
    categories,
    types,
    id_skills,
    search,
  } = params;

  const listIdSkill = id_skills?.split(",");
  const listCategory = categories?.split(",") as CategoryProject[];
  const listType = types?.split(",") as TypeProject[];
  const take = items_perpage;
  const skip = Number(items_perpage) * (Number(page_no) - 1);

  const result = await prisma?.project?.findMany({
    ...(take && { take }),
    ...(skip && { skip }),
    where: {
      ...(id_user && { id_user }),
      AND: [
        {
          ...(search && {
            name: {
              contains: search,
            },
          }),
        },
        {
          experiance: {
            ...(search && {
              company: {
                name: {
                  contains: search,
                },
              },
            }),
          },
        },
        {
          OR: listIdSkill?.map((id_skill) => ({
            tech_stacks: {
              ...(id_skill && {
                some: {
                  skill_user: {
                    id_skill,
                  },
                },
              }),
            },
          })),
        },
        {
          OR: listCategory?.map((category) => ({
            ...(category && {
              category: {
                equals: category,
              },
            }),
          })),
        },
        {
          OR: listType?.map((type) => ({
            ...(type && {
              type: {
                equals: type,
              },
            }),
          })),
        },
      ],
    },
    orderBy: {
      [sort_by]: sort_dir,
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
                },
              },
            },
          },
        },
      },
    },
  });

  const items = await Promise.all(
    result?.map(async (project) => {
      const thumbnail_image = await getImageUrlFromClaudinary({
        publicId: project.thumbnail_image,
      });
      return {
        ...project,
        thumbnail_image,
        tech_stacks: project?.tech_stacks?.map((techStack) => ({
          id: techStack?.id,
          id_skill: techStack?.skill_user?.skill?.id,
          name: techStack?.skill_user?.skill?.name,
          color: techStack?.skill_user?.skill?.color,
        })),
      };
    })
  );

  const resultDto = {
    items,
    current_page: page_no ?? 0,
    total_items: await prisma?.project?.count({
      where: { id_user },
    }),
  };

  return result ? resultDto : null;
};

export const upsertProjectDto = async (
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
      create: params?.id_skill_users?.map((id_skill_user) => ({
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
    await deleteImageFromCloudinary(existingData?.thumbnail_image || "");
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

export const getProjectByIdDto = async (param: string) => {
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
          const skill_image = await getImageUrlFromClaudinary({
            publicId: tech_stack?.skill_user?.skill?.image,
          });
          return skill_image;
        })
      )
    : [];

  const resultDto = {
    ...result,
    tech_stacks: result?.tech_stacks?.map((techStack, i) => ({
      id: techStack?.id,
      id_skill: techStack?.skill_user?.skill?.id,
      name: techStack?.skill_user?.skill?.name,
      color: techStack?.skill_user?.skill?.color,
      image: skill_images[i],
    })),
  };

  return result ? resultDto : null;
};

export const deleteProjectByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.project?.delete({
    where: {
      id,
    },
  });
  const resultDto = result;

  return result ? resultDto : null;
};
