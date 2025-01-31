// File: src/components/HabitacionForm.tsx
import React from "react";

type HabitacionFormProps = {
  form: { id: string; type: string; price: string };
  roomTypes: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const HabitacionForm: React.FC<HabitacionFormProps> = ({ form, roomTypes, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Tipo de Habitación:</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 w-full bg-[#242424]"
        >
          <option value="">Seleccione un tipo</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Precio por Noche:</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {form.id ? "Actualizar Habitación" : "Agregar Habitación"}
      </button>
    </form>
  );
};

export default HabitacionForm;
