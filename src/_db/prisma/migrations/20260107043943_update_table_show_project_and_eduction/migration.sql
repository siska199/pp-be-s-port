/*
  Warnings:

  - You are about to drop the column `is_show_project` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `is_show_project` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "education" DROP COLUMN "is_show_project",
ADD COLUMN     "is_show" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "is_show_project",
ADD COLUMN     "is_show" BOOLEAN NOT NULL DEFAULT true;
