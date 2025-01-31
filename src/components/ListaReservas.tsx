// File: src/components/ListaReservas.tsx
import React from "react";

type Room = {
  id: string;
  type: string;
};

type Reserva = {
  id: string;
  cliente: string;
  habitaciones: string[]; // Room IDs
  startDate: string;
  endDate: string;
};

type ListaReservasProps = {
  reservas: Reserva[];
  habitaciones: Room[]; // Array of rooms with id and type
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ListaReservas: React.FC<ListaReservasProps> = ({
  reservas,
  habitaciones,
  onEdit,
  onDelete,
}) => {
  // Create a map for quick lookup of room types by their IDs
  const roomTypeMap = habitaciones.reduce((map, room) => {
    map[room.id] = room.type;
    return map;
  }, {} as Record<string, string>);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="border border-gray-300 px-4 py-2">Cliente</th>
          <th className="border border-gray-300 px-4 py-2">Habitaciones</th>
          <th className="border border-gray-300 px-4 py-2">Fecha de Inicio</th>
          <th className="border border-gray-300 px-4 py-2">Fecha de Fin</th>
          <th className="border border-gray-300 px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reservas.map((reserva) => (
          <tr key={reserva.id}>
            <td className="border border-gray-300 px-4 py-2">{reserva.cliente}</td>
            <td className="border border-gray-300 px-4 py-2">
              {reserva.habitaciones.map((roomId) => roomTypeMap[roomId] || "Desconocida").join(", ")}
            </td>
            <td className="border border-gray-300 px-4 py-2">{reserva.startDate}</td>
            <td className="border border-gray-300 px-4 py-2">{reserva.endDate}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onEdit(reserva.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(reserva.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaReservas;
