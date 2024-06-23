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
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KreamProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "scrapedAt_idx" ON "KreamProduct"("scrapedAt");
