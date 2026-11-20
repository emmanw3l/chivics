import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET /api/cars - all cars with images, newest first
router.get("/", async (_req, res) => {
  const cars = await prisma.car.findMany({
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(cars);
});

// GET /api/cars/:id - single car with images
router.get("/:id", async (req, res) => {
  const car = await prisma.car.findUnique({
    where: { id: req.params.id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }
  res.json(car);
});

export default router;
