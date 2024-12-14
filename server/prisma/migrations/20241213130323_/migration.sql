/*
  Warnings:

  - You are about to drop the column `imgIds` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "imgIds",
ADD COLUMN     "mediaIds" TEXT,
ALTER COLUMN "tags" DROP NOT NULL;
