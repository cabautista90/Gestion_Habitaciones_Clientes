// File: src/components/ListaClientes.tsx
import React from "react";

type Cliente = {
  id: string;
  name: string;
  email: string;
};

type ListaClientesProps = {
  clientes: Cliente[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const ListaClientes: React.FC<ListaClientesProps> = ({ clientes, handleEdit, handleDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-600">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Nombre</th>
          <th className="border border-gray-300 px-4 py-2">Correo</th>
          <th className="border border-gray-300 px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td className="border border-gray-300 px-4 py-2">{cliente.id}</td>
            <td className="border border-gray-300 px-4 py-2">{cliente.name}</td>
            <td className="border border-gray-300 px-4 py-2">{cliente.email}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => handleEdit(cliente.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(cliente.id)}
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

export default ListaClientes;
