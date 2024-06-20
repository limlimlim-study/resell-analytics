/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "KreamProduct" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "translatedName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "wish" INTEGER NOT NULL,
    "style" INTEGER NOT NULL,
    "sales" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isBrand" BOOLEAN NOT NULL,
    "time" BIGINT NOT NULL,

    CONSTRAINT "KreamProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "time_idx" ON "KreamProduct"("time");
