-- This is an empty migration.
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "start_at" DROP NOT NULL;
ALTER TABLE "project" ALTER COLUMN "end_at" DROP NOT NULL;

