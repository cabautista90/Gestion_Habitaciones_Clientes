// File: src/pages/ClientesPage.tsx
import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import ClienteForm from "../components/ClienteForm";
import ListaClientes from "../components/ListaClientes";

type Cliente = {
  id: string;
  name: string;
  email: string;
};

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState({ id: "", name: "", email: "" });

  // Load clients from localStorage on component mount
  useEffect(() => {
    const storedClientes = getLocalStorage("clientes");
    setClientes(storedClientes);
  }, []);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update client
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      alert("Por favor, complete el nombre y un correo válido.");
      return;
    }

    let updatedClientes = [...clientes];

    if (form.id) {
      // Update existing client
      updatedClientes = updatedClientes.map((c) =>
        c.id === form.id ? { ...form } : c
      );
    } else {
      // Add new client with a unique ID
      updatedClientes.push({
        ...form,
        id: Date.now().toString(),
      });
    }

    setClientes(updatedClientes);
    setLocalStorage("clientes", updatedClientes);
    setForm({ id: "", name: "", email: "" }); // Reset form
  };

  // Edit client
  const handleEdit = (id: string) => {
    const cliente = clientes.find((c) => c.id === id);
    if (cliente) setForm(cliente);
  };

  // Delete client
  const handleDelete = (id: string) => {
    const updatedClientes = clientes.filter((c) => c.id !== id);
    setClientes(updatedClientes);
    setLocalStorage("clientes", updatedClientes);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <ClienteForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ListaClientes clientes={clientes} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default ClientesPage;
