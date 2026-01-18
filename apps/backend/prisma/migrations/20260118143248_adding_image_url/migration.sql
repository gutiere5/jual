-- AlterTable
ALTER TABLE "item" ADD COLUMN     "image_url" VARCHAR(255),
ALTER COLUMN "sku" DROP NOT NULL;
