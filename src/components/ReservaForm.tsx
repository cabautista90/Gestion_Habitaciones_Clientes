// File: src/components/ReservaForm.tsx
import React from "react";

type Room = {
  id: string;
  type: string;
};

type Reserva = {
  id: string;
  cliente: string;
  habitaciones: string[];
  startDate: string;
  endDate: string;
};

type ReservaFormProps = {
  form: {
    cliente: string;
    habitaciones: string[];
    startDate: string;
    endDate: string;
  };
  clientes: string[];
  habitaciones: Room[];
  reservas: Reserva[]; // Existing reservations for validation
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const ReservaForm: React.FC<ReservaFormProps> = ({
  form,
  clientes,
  habitaciones,
  reservas,
  handleChange,
  handleSubmit,
}) => {
  // Validate dates and room availability
  const validateReservation = (): boolean => {
    const { startDate, endDate, habitaciones: selectedRooms } = form;

    // Check if dates are valid
    if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
      alert("Por favor, ingrese un rango de fechas válido.");
      return false;
    }

    // Check for overlapping reservations
    for (const roomId of selectedRooms) {
      const overlappingReservation = reservas.find((reserva) =>
        reserva.habitaciones.includes(roomId) &&
        new Date(startDate) < new Date(reserva.endDate) &&
        new Date(endDate) > new Date(reserva.startDate)
      );

      if (overlappingReservation) {
        alert(
          `Conflicto: La habitación "${habitaciones.find(
            (h) => h.id === roomId
          )?.type}" ya está reservada en el rango de fechas seleccionado.`
        );
        return false;
      }
    }

    return true;
  };

  // Enhance handleSubmit to include validation
  const enhancedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateReservation()) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={enhancedSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Cliente:</label>
        <select
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
          className="border p-2 w-full bg-[#242424]"
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente} value={cliente}>
              {cliente}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Habitaciones:</label>
        <select
          name="habitaciones"
          multiple
          value={form.habitaciones}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          {habitaciones.map((habitacion) => (
            <option key={habitacion.id} value={habitacion.id}>
              {habitacion.type}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Fecha de Inicio:</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Fecha de Fin:</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Agregar Reserva
      </button>
    </form>
  );
};

export default ReservaForm;
