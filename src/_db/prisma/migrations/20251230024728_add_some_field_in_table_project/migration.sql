/*
  Warnings:

  - Added the required column `id_profession` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_at` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "end_at" TIMESTAMP(3),
ADD COLUMN     "id_profession" VARCHAR(36) NOT NULL,
ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_id_profession_fkey" FOREIGN KEY ("id_profession") REFERENCES "master_profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
