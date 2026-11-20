import cors from "cors";
import "dotenv/config";
import express from "express";
import adminCarsRouter from "./routes/adminCars.js";
import carsRouter from "./routes/cars.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cars", carsRouter);
app.use("/api/admin/cars", adminCarsRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT ?? 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));