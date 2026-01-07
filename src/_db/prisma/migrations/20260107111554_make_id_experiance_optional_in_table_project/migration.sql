-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_id_experiance_fkey";

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "id_experiance" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_id_experiance_fkey" FOREIGN KEY ("id_experiance") REFERENCES "experiance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
