import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "./adminHeader";
import { api } from "../../lib/api";
import { uploadCarImage } from "../../lib/cloudinaryUpload";
import type { Car, CarImage } from "../../types/car";

const emptyForm = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  description: "",
  mileage: undefined as number | undefined,
  transmission: "",
  fuelType: "",
};

export function CarForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState<CarImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get<Car>(`/cars/${id}`).then((res) => {
      const car = res.data;
      setForm({
        make: car.make,
        model: car.model,
        year: car.year,
        price: Number(car.price),
        description: car.description,
        mileage: car.mileage ?? undefined,
        transmission: car.transmission ?? "",
        fuelType: car.fuelType ?? "",
      });
      setImages(car.images);
    });
  }, [id]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const uploaded = await uploadCarImage(file);

        if (isEdit) {
          // Attach immediately so a page refresh mid-edit doesn't lose it.
          const res = await api.post(`/admin/cars/${id}/images`, {
            ...uploaded,
            order: images.length,
          });
          setImages((prev) => [...prev, res.data]);
        } else {
          // No car yet — hold images locally until the car is created.
          setImages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), url: uploaded.url, storagePath: uploaded.storagePath, order: prev.length },
          ]);
        }
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleRemoveImage(image: CarImage) {
    if (isEdit) {
      await api.delete(`/admin/cars/${id}/images/${image.id}`);
    }
    setImages((prev) => prev.filter((img) => img.id !== image.id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), year: Number(form.year) };

      if (isEdit) {
        await api.put(`/admin/cars/${id}`, payload);
      } else {
        await api.post("/admin/cars", {
          ...payload,
          images: images.map(({ url, storagePath, order }) => ({ url, storagePath, order })),
        });
      }
      navigate("/admin");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminHeader title={isEdit ? "Edit car" : "Add car"} />

      <motion.div
        className="container pb-5"
        style={{ maxWidth: 560 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-6">
            <label className="form-label">Make</label>
            <input
              required
              value={form.make}
              onChange={(e) => setForm({ ...form, make: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Model</label>
            <input
              required
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Year</label>
            <input
              required
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Price (₦)</label>
            <input
              required
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Mileage</label>
            <input
              type="number"
              value={form.mileage ?? ""}
              onChange={(e) => setForm({ ...form, mileage: e.target.value ? Number(e.target.value) : undefined })}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Transmission</label>
            <input
              value={form.transmission}
              onChange={(e) => setForm({ ...form, transmission: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Fuel type</label>
            <input
              value={form.fuelType}
              onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
              className="form-control"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mt-3">
          <label className="form-label">Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            className="form-control"
          />
          {uploading && <p className="text-muted small mt-1">Uploading…</p>}

          {images.length > 0 && (
            <div className="row row-cols-4 g-2 mt-1">
              {images.map((image) => (
                <div className="col position-relative" key={image.id}>
                  <img src={image.url} alt="" className="w-100" style={{ height: 80, objectFit: "cover" }} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image)}
                    className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center"
                    style={{ width: 20, height: 20, fontSize: 12, lineHeight: 1 }}
                    aria-label="Remove photo"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
          className="btn w-100 mt-4 text-white fw-medium"
          style={{ backgroundColor: "#1e4fd6" }}
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Add car"}
        </button>
      </form>
      </motion.div>
    </div>
  );
}