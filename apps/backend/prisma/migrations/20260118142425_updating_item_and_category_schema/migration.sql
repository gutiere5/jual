-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'FRUIT';
ALTER TYPE "Category" ADD VALUE 'BEEF';
ALTER TYPE "Category" ADD VALUE 'POULTRY';
ALTER TYPE "Category" ADD VALUE 'PORK';
ALTER TYPE "Category" ADD VALUE 'RESTAURANT';

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "ingredients" VARCHAR(255);
