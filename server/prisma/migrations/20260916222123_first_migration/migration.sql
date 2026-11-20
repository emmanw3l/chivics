-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "mileage" INTEGER,
    "transmission" TEXT,
    "fuelType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "carId" TEXT NOT NULL,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Car_createdAt_idx" ON "Car"("createdAt");

-- CreateIndex
CREATE INDEX "CarImage_carId_idx" ON "CarImage"("carId");

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
