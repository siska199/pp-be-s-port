-- DropForeignKey
ALTER TABLE "personal_information" DROP CONSTRAINT "personal_information_id_city_fkey";

-- DropForeignKey
ALTER TABLE "personal_information" DROP CONSTRAINT "personal_information_id_district_fkey";

-- DropForeignKey
ALTER TABLE "personal_information" DROP CONSTRAINT "personal_information_id_postal_code_fkey";

-- DropForeignKey
ALTER TABLE "personal_information" DROP CONSTRAINT "personal_information_id_province_fkey";

-- AlterTable
ALTER TABLE "personal_information" ALTER COLUMN "id_province" DROP NOT NULL,
ALTER COLUMN "id_city" DROP NOT NULL,
ALTER COLUMN "id_district" DROP NOT NULL,
ALTER COLUMN "id_postal_code" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_province_fkey" FOREIGN KEY ("id_province") REFERENCES "master_province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "master_city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_district_fkey" FOREIGN KEY ("id_district") REFERENCES "master_district"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_postal_code_fkey" FOREIGN KEY ("id_postal_code") REFERENCES "master_postal_code"("id") ON DELETE SET NULL ON UPDATE CASCADE;
