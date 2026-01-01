-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCE');

-- CreateEnum
CREATE TYPE "CategoryProject" AS ENUM ('WEBSITE', 'MOBILE', 'API', 'UI_UX');

-- CreateEnum
CREATE TYPE "TypeProject" AS ENUM ('PERSONAL_PROJECT', 'COMPANY_PROJECT', 'FREELANCE');

-- CreateTable
CREATE TABLE "master_company" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(2083) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_province" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "master_city" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_province" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "master_district" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_city" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "master_postal_code" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postal_code" TEXT,
    "id_district" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_postal_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_profession" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_category_social_link" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(2083) NOT NULL,
    "placeholder" VARCHAR(255) NOT NULL,
    "default_value" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_category_social_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_education_level" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_education_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_education_major" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_education_major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_level_major_education" (
    "id" TEXT NOT NULL,
    "id_level" VARCHAR(36) NOT NULL,
    "id_major" VARCHAR(36) NOT NULL,

    CONSTRAINT "master_level_major_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_education_school" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(2083) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_education_school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_level_school_education" (
    "id" TEXT NOT NULL,
    "id_level" VARCHAR(36) NOT NULL,
    "id_school" VARCHAR(36) NOT NULL,

    CONSTRAINT "master_level_school_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_category_skill" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_category_skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_skill" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(2083) NOT NULL,
    "color" VARCHAR(255),
    "id_category" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "master_user" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50),
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "phone_number" VARCHAR(15),
    "image" VARCHAR(255),
    "id_profession" VARCHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_information" (
    "id" TEXT NOT NULL,
    "professional_image" VARCHAR(2083) NOT NULL,
    "resume" VARCHAR(2083) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "about_me" TEXT NOT NULL,
    "bio" VARCHAR(255) NOT NULL,
    "id_profession" VARCHAR(36) NOT NULL,
    "id_user" VARCHAR(36) NOT NULL,
    "id_province" VARCHAR(36),
    "id_city" VARCHAR(36),
    "id_district" VARCHAR(36),
    "id_postal_code" VARCHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personal_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_metric" (
    "id" TEXT NOT NULL,
    "id_user" VARCHAR(36) NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "value" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "key_metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_link" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(2083) NOT NULL,
    "id_category" VARCHAR(36) NOT NULL,
    "id_user" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
    "id" TEXT NOT NULL,
    "id_user" VARCHAR(36) NOT NULL,
    "id_level" VARCHAR(36) NOT NULL,
    "id_major" VARCHAR(36) NOT NULL,
    "id_school" VARCHAR(36) NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiance" (
    "id" TEXT NOT NULL,
    "id_user" VARCHAR(36) NOT NULL,
    "id_company" VARCHAR(36) NOT NULL,
    "id_profession" VARCHAR(36) NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3),
    "is_currently_work_here" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_user" (
    "id" TEXT NOT NULL,
    "id_skill" VARCHAR(36) NOT NULL,
    "years_of_experiance" DOUBLE PRECISION NOT NULL,
    "level" "Level" NOT NULL,
    "id_user" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "thumbnail_image" VARCHAR(2083) NOT NULL,
    "description" TEXT NOT NULL,
    "category" "CategoryProject" NOT NULL,
    "type" "TypeProject" NOT NULL,
    "id_experiance" VARCHAR(36) NOT NULL,
    "id_user" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "id_profession" VARCHAR(36) NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_responsibility" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_project" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_responsibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_menu" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "main_image" VARCHAR(2083) NOT NULL,
    "features" TEXT NOT NULL,
    "id_project" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_menu_related_image" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(2083) NOT NULL,
    "id_project_menu" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_menu_related_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tech_stack" (
    "id" TEXT NOT NULL,
    "id_project" VARCHAR(36) NOT NULL,
    "id_skill_user" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_tech_stack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_link" (
    "id" TEXT NOT NULL,
    "id_project" VARCHAR(36) NOT NULL,
    "url" VARCHAR(2083) NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_company_name_key" ON "master_company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_province_id_key" ON "master_province"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_city_id_key" ON "master_city"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_district_id_key" ON "master_district"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_profession_name_key" ON "master_profession"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_category_social_link_name_key" ON "master_category_social_link"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_education_level_name_key" ON "master_education_level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_education_major_name_key" ON "master_education_major"("name");

-- CreateIndex
CREATE INDEX "master_level_major_education_id_level_id_major_idx" ON "master_level_major_education"("id_level", "id_major");

-- CreateIndex
CREATE UNIQUE INDEX "master_level_major_education_id_level_id_major_key" ON "master_level_major_education"("id_level", "id_major");

-- CreateIndex
CREATE UNIQUE INDEX "master_education_school_name_key" ON "master_education_school"("name");

-- CreateIndex
CREATE INDEX "master_level_school_education_id_level_id_school_idx" ON "master_level_school_education"("id_level", "id_school");

-- CreateIndex
CREATE UNIQUE INDEX "master_level_school_education_id_level_id_school_key" ON "master_level_school_education"("id_level", "id_school");

-- CreateIndex
CREATE UNIQUE INDEX "master_category_skill_name_key" ON "master_category_skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_skill_name_key" ON "master_skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "master_country_id_key" ON "master_country"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_user_id_key" ON "master_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "master_user_username_key" ON "master_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "master_user_email_key" ON "master_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "personal_information_id_user_key" ON "personal_information"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "key_metric_key_value_id_user_key" ON "key_metric"("key", "value", "id_user");

-- CreateIndex
CREATE UNIQUE INDEX "social_link_id_category_id_user_key" ON "social_link"("id_category", "id_user");

-- CreateIndex
CREATE UNIQUE INDEX "education_id_user_id_level_id_major_id_school_key" ON "education"("id_user", "id_level", "id_major", "id_school");

-- CreateIndex
CREATE UNIQUE INDEX "experiance_id_company_id_user_id_profession_created_at_star_key" ON "experiance"("id_company", "id_user", "id_profession", "created_at", "start_at");

-- CreateIndex
CREATE UNIQUE INDEX "skill_user_id_skill_id_user_key" ON "skill_user"("id_skill", "id_user");

-- CreateIndex
CREATE UNIQUE INDEX "project_id_key" ON "project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "project_responsibility_id_key" ON "project_responsibility"("id");

-- CreateIndex
CREATE UNIQUE INDEX "project_menu_id_key" ON "project_menu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "project_tech_stack_id_project_id_skill_user_key" ON "project_tech_stack"("id_project", "id_skill_user");

-- CreateIndex
CREATE UNIQUE INDEX "project_link_id_project_id_key" ON "project_link"("id_project", "id");

-- AddForeignKey
ALTER TABLE "master_province" ADD CONSTRAINT "master_province_id_country_fkey" FOREIGN KEY ("id_country") REFERENCES "master_country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_city" ADD CONSTRAINT "master_city_id_province_fkey" FOREIGN KEY ("id_province") REFERENCES "master_province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_district" ADD CONSTRAINT "master_district_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "master_city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_postal_code" ADD CONSTRAINT "master_postal_code_id_district_fkey" FOREIGN KEY ("id_district") REFERENCES "master_district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_level_major_education" ADD CONSTRAINT "master_level_major_education_id_level_fkey" FOREIGN KEY ("id_level") REFERENCES "master_education_level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_level_major_education" ADD CONSTRAINT "master_level_major_education_id_major_fkey" FOREIGN KEY ("id_major") REFERENCES "master_education_major"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_level_school_education" ADD CONSTRAINT "master_level_school_education_id_level_fkey" FOREIGN KEY ("id_level") REFERENCES "master_education_level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_level_school_education" ADD CONSTRAINT "master_level_school_education_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "master_education_school"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_skill" ADD CONSTRAINT "master_skill_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "master_category_skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_user" ADD CONSTRAINT "master_user_id_profession_fkey" FOREIGN KEY ("id_profession") REFERENCES "master_profession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "master_city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_district_fkey" FOREIGN KEY ("id_district") REFERENCES "master_district"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_postal_code_fkey" FOREIGN KEY ("id_postal_code") REFERENCES "master_postal_code"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_profession_fkey" FOREIGN KEY ("id_profession") REFERENCES "master_profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_province_fkey" FOREIGN KEY ("id_province") REFERENCES "master_province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_information" ADD CONSTRAINT "personal_information_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_metric" ADD CONSTRAINT "key_metric_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_link" ADD CONSTRAINT "social_link_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "master_category_social_link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_link" ADD CONSTRAINT "social_link_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_id_level_fkey" FOREIGN KEY ("id_level") REFERENCES "master_education_level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_id_major_fkey" FOREIGN KEY ("id_major") REFERENCES "master_education_major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_id_school_fkey" FOREIGN KEY ("id_school") REFERENCES "master_education_school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiance" ADD CONSTRAINT "experiance_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "master_company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiance" ADD CONSTRAINT "experiance_id_profession_fkey" FOREIGN KEY ("id_profession") REFERENCES "master_profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiance" ADD CONSTRAINT "experiance_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_user" ADD CONSTRAINT "skill_user_id_skill_fkey" FOREIGN KEY ("id_skill") REFERENCES "master_skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_user" ADD CONSTRAINT "skill_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_id_experiance_fkey" FOREIGN KEY ("id_experiance") REFERENCES "experiance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_id_profession_fkey" FOREIGN KEY ("id_profession") REFERENCES "master_profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "master_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_responsibility" ADD CONSTRAINT "project_responsibility_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_menu" ADD CONSTRAINT "project_menu_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_menu_related_image" ADD CONSTRAINT "project_menu_related_image_id_project_menu_fkey" FOREIGN KEY ("id_project_menu") REFERENCES "project_menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tech_stack" ADD CONSTRAINT "project_tech_stack_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tech_stack" ADD CONSTRAINT "project_tech_stack_id_skill_user_fkey" FOREIGN KEY ("id_skill_user") REFERENCES "skill_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_link" ADD CONSTRAINT "project_link_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
