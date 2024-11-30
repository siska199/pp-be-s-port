import prisma from "@0 db/prisma";
import projectSchema from "@2. validation/7. project-schema";
import projectSchmea from "@2. validation/7. project-schema";
import {
  deleteImageFromCloudinary,
  getImageUrlFromClaudinary,
} from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
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
  const skip = items_perpage * page_no;

  const result = await prisma?.project?.findMany({
    take,
    skip,
    where: {
      id_user,
      AND: [
        {
          name: {
            contains: search,
          },
          experiance: {
            company: {
              name: {
                contains: search,
              },
            },
          },
        },
        {
          OR: listIdSkill?.map((id_skill) => ({
            tech_stacks: {
              some: {
                skill_user: {
                  id_skill,
                },
              },
            },
          })),
        },
        {
          OR: listCategory?.map((category) => ({
            category: {
              equals: category,
            },
          })),
        },
        {
          OR: listType?.map((type) => ({
            type: {
              equals: type,
            },
          })),
        },
      ],
    },
    orderBy: {
      [sort_by]: sort_dir,
    },
  });

  const resultDto = await Promise.all(
    result?.map(async (project) => {
      const thumbnail_image = await getImageUrlFromClaudinary({
        publicId: project.thumbnail_image,
      });
      return {
        ...project,
        thumbnail_image,
      };
    })
  );

  return result ? resultDto : null;
};

export const upsertProjectDto = async (params: Project) => {
  const id = params.id;
  const dataDto = {
    name: params?.name,
    thumbnail_image: params?.thumbnail_image,
    description: params?.description,
    category: params?.category,
    type: params?.type,
    id_experiance: params?.id_experiance,
    id_user: params?.id_user,
  };

  if (id && dataDto?.thumbnail_image) {
    await deleteImageFromCloudinary(dataDto.thumbnail_image);
  }

  await validationParse({
    schema: projectSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.project?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_user"],
    }),
  });

  const resultDto = result;
  return result ? resultDto : null;
};
