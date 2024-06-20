-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "time" BIGINT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "wish" INTEGER NOT NULL,
    "style" INTEGER NOT NULL,
    "sales" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "isBrand" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "translatedName" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
