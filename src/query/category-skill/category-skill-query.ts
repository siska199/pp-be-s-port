import prisma from "@db/prisma";
import { CategorySkill } from "@prisma/client";

export const getListCategorySkill = async () => {
  return await prisma.categorySkill.findMany();
};

export const insertBulkCategorySkill = async (
  categoriesSkill: CategorySkill[]
) => {
  return await prisma.categorySkill.createMany({
    data: categoriesSkill,
  });
};
