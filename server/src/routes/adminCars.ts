import { Router } from "express";
import { z } from "zod";
import { deleteCloudinaryImage, getUploadSignature } from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
router.use(requireAuth);

const carSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int(),
  price: z.number().positive(),
  description: z.string().min(1),
  mileage: z.number().int().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
});

// Note: `storagePath` holds Cloudinary's public_id (kept this field name
// from the earlier Firebase Storage setup to avoid another migration).
const imageSchema = z.object({
  url: z.string().url(),
  storagePath: z.string().min(1),
  order: z.number().int().optional(),
});

// POST /api/admin/cars - create a car, optionally with images already
// uploaded to Cloudinary from the admin form
router.post("/", async (req, res) => {
  const parsed = carSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const images = z.array(imageSchema).optional().parse(req.body.images ?? []);

  const car = await prisma.car.create({
    data: {
      ...parsed.data,
      images: { create: images },
    },
    include: { images: true },
  });

  res.status(201).json(car);
});

// PUT /api/admin/cars/:id - update car details
router.put("/:id", async (req, res) => {
  const parsed = carSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const car = await prisma.car.update({
    where: { id: req.params.id },
    data: parsed.data,
    include: { images: true },
  });

  res.json(car);
});

// DELETE /api/admin/cars/:id - remove a car and its images
router.delete("/:id", async (req, res) => {
  const car = await prisma.car.findUnique({
    where: { id: req.params.id },
    include: { images: true },
  });
  if (!car) return res.status(404).json({ error: "Car not found" });

  await Promise.all(
    car.images.map((img: { storagePath: string }) => deleteCloudinaryImage(img.storagePath))
  );
  await prisma.car.delete({ where: { id: req.params.id } });

  res.status(204).send();
});

// POST /api/admin/cars/:id/images - attach an already-uploaded image
router.post("/:id/images", async (req, res) => {
  const parsed = imageSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const image = await prisma.carImage.create({
    data: { ...parsed.data, carId: req.params.id },
  });

  res.status(201).json(image);
});

// DELETE /api/admin/cars/:carId/images/:imageId
router.delete("/:carId/images/:imageId", async (req, res) => {
  const image = await prisma.carImage.findUnique({ where: { id: req.params.imageId } });
  if (!image) return res.status(404).json({ error: "Image not found" });

  await deleteCloudinaryImage(image.storagePath);
  await prisma.carImage.delete({ where: { id: req.params.imageId } });

  res.status(204).send();
});

// GET /api/admin/upload-signature - signed params for direct Cloudinary upload
router.get("/upload-signature", (_req, res) => {
  const signature = getUploadSignature({ folder: "car-sales" });
  res.json(signature);
});

export default router;