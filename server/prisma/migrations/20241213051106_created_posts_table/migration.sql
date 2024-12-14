-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "postUrl" TEXT NOT NULL,
    "imgIds" TEXT NOT NULL,
    "postedBy" TEXT NOT NULL,
    "postedAt" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "caption" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);
