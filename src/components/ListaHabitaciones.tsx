// File: src/components/ListaHabitaciones.tsx
import React from "react";

type Habitacion = {
  id: string;
  type: string;
  price: number;
};

type ListaHabitacionesProps = {
  habitaciones: Habitacion[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const ListaHabitaciones: React.FC<ListaHabitacionesProps> = ({ habitaciones, handleEdit, handleDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-600">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Tipo</th>
          <th className="border border-gray-300 px-4 py-2">Precio</th>
          <th className="border border-gray-300 px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {habitaciones.map((habitacion) => (
          <tr key={habitacion.id}>
            <td className="border border-gray-300 px-4 py-2">{habitacion.id}</td>
            <td className="border border-gray-300 px-4 py-2">{habitacion.type}</td>
            <td className="border border-gray-300 px-4 py-2">${habitacion.price}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => handleEdit(habitacion.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(habitacion.id)}
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

export default ListaHabitaciones;
