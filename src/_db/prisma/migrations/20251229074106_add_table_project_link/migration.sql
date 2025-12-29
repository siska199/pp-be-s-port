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
CREATE UNIQUE INDEX "project_link_id_project_id_key" ON "project_link"("id_project", "id");

-- AddForeignKey
ALTER TABLE "project_link" ADD CONSTRAINT "project_link_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
