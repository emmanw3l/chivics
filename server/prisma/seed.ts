import { PrismaClient } from "@prisma/client";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../src/lib/cloudinary.js";

const prisma = new PrismaClient();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "seed-images");

/**
 * Uploads every image file found in prisma/seed-images/<slug>/ to
 * Cloudinary and returns the CarImage rows to create for it. Files are
 * ordered alphabetically, so name them 1.jpg, 2.jpg, etc. to control
 * carousel order.
 */
async function uploadSeedImages(slug: string) {
  const folder = path.join(IMAGES_DIR, slug);
  const files = readdirSync(folder)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();

  if (files.length === 0) {
    throw new Error(`No images found in prisma/seed-images/${slug}/`);
  }

  const images = [];

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const localPath = path.join(folder, filename);

    console.log(`  uploading ${filename}...`);
    const result = await cloudinary.uploader.upload(localPath, {
      folder: `car-sales/${slug}`,
    });

    images.push({ url: result.secure_url, storagePath: result.public_id, order: i });
  }

  return images;
}

// Each `slug` maps to a folder under prisma/seed-images/ — create that
// folder with your real photos before running this (e.g.
// prisma/seed-images/toyota-camry/1.jpg, 2.jpg, ...). Edit the car details
// below to match your actual inventory.
const cars = [
  {
    slug: "toyota-camry",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    price: 27500000,
    description:
      "Well-maintained Camry with full service history. Smooth ride, great fuel economy, and a spacious interior — ideal for daily commuting or family trips.",
    mileage: 32000,
    transmission: "Automatic",
    fuelType: "Petrol",
  },
  {
    slug: "honda-accord",
    make: "Honda",
    model: "Accord",
    year: 2020,
    price: 25800000,
    description:
      "Reliable Accord in excellent condition. Recently serviced, new tires, and a clean interior throughout. A dependable choice for everyday driving.",
    mileage: 41000,
    transmission: "Automatic",
    fuelType: "Petrol",
  },
];

async function main() {
  console.log("Seeding cars...");

  for (const { slug, ...carData } of cars) {
    console.log(`Uploading images for ${slug}...`);
    const images = await uploadSeedImages(slug);

    await prisma.car.create({
      data: {
        ...carData,
        images: { create: images },
      },
    });
  }

  console.log(`Seeded ${cars.length} cars.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());