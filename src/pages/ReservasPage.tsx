import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import ListaReservas from "../components/ListaReservas";
import ReservaForm from "../components/ReservaForm";

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

const ReservasPage = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [clientes, setClientes] = useState<string[]>([]);
  const [habitaciones, setHabitaciones] = useState<Room[]>([]);
  const [form, setForm] = useState({
    id: "",
    cliente: "",
    habitaciones: [] as string[],
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const storedReservas = getLocalStorage("reservas");
    const storedClientes = getLocalStorage("clientes").map((c: any) => c.name);
    const storedHabitaciones = getLocalStorage("habitaciones") || [];
    setReservas(storedReservas);
    setClientes(storedClientes);
    setHabitaciones(storedHabitaciones);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "habitaciones") {
      const selectedRooms = Array.from((e.target as HTMLSelectElement).selectedOptions).map(
        (opt) => opt.value
      );
      setForm({ ...form, habitaciones: selectedRooms });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cliente || form.habitaciones.length === 0) {
      alert("Por favor, seleccione un cliente y al menos una habitación.");
      return;
    }
    const newReserva: Reserva = {
      id: form.id || Date.now().toString(),
      cliente: form.cliente,
      habitaciones: form.habitaciones,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    const updatedReservas = form.id
      ? reservas.map((r) => (r.id === form.id ? newReserva : r))
      : [...reservas, newReserva];
    setReservas(updatedReservas);
    setLocalStorage("reservas", updatedReservas);
    setForm({ id: "", cliente: "", habitaciones: [], startDate: "", endDate: "" });
  };

  const handleEdit = (id: string) => {
    const reserva = reservas.find((r) => r.id === id);
    if (reserva) {
      setForm({ ...reserva });
    }
  };

  const handleDelete = (id: string) => {
    const updatedReservas = reservas.filter((r) => r.id !== id);
    setReservas(updatedReservas);
    setLocalStorage("reservas", updatedReservas);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Reservas</h1>
      <ReservaForm
        form={form}
        clientes={clientes}
        habitaciones={habitaciones}
        reservas={reservas}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ListaReservas
        reservas={reservas}
        habitaciones={habitaciones}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ReservasPage;
