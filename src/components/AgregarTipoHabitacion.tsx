// File: src/components/AgregarTipoHabitacion.tsx
import React from "react";

type AgregarTipoHabitacionProps = {
  newRoomType: string;
  setNewRoomType: (value: string) => void;
  handleAddRoomType: (e: React.FormEvent) => void;
};

const AgregarTipoHabitacion: React.FC<AgregarTipoHabitacionProps> = ({
  newRoomType,
  setNewRoomType,
  handleAddRoomType,
}) => {
  return (
    <form onSubmit={handleAddRoomType} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Agregar Nuevo Tipo de Habitación:</label>
        <input
          type="text"
          value={newRoomType}
          onChange={(e) => setNewRoomType(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Agregar Tipo
      </button>
    </form>
  );
};

export default AgregarTipoHabitacion;
