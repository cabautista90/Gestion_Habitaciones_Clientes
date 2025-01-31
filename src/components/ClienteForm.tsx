// File: src/components/ClienteForm.tsx
import React, { useState } from "react";

type ClienteFormProps = {
  form: { id: string; name: string; email: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const ClienteForm: React.FC<ClienteFormProps> = ({ form, handleChange, handleSubmit }) => {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    // Check if the name is not empty
    if (!form.name.trim()) {
      newErrors.name = "El nombre no puede estar vacío.";
    }

    // Check if the email has a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "El correo debe tener un formato válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  // Enhanced handleSubmit with validation
  const enhancedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e); // Only call handleSubmit if form is valid
    }
  };

  return (
    <form onSubmit={enhancedSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Nombre:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Correo:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`border p-2 w-full ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {form.id ? "Actualizar Cliente" : "Agregar Cliente"}
      </button>
    </form>
  );
};

export default ClienteForm;
