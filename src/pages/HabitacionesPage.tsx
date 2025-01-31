// File: src/pages/HabitacionesPage.tsx
import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import HabitacionForm from "../components/HabitacionForm";
import ListaHabitaciones from "../components/ListaHabitaciones";
import AgregarTipoHabitacion from "../components/AgregarTipoHabitacion";

type Habitacion = {
  id: string;
  type: string;
  price: number;
};

const HabitacionesPage = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [form, setForm] = useState({ id: "", type: "", price: "" });
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    const storedHabitaciones = getLocalStorage("habitaciones");
    const storedRoomTypes = getLocalStorage("roomTypes") || ["Individual", "Doble", "Suite"];
    setHabitaciones(storedHabitaciones);
    setRoomTypes(storedRoomTypes);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      alert("Por favor, seleccione un tipo y un precio válido.");
      return;
    }
    const updatedHabitaciones = form.id
      ? habitaciones.map((h) => (h.id === form.id ? { ...form, price: Number(form.price) } : h))
      : [...habitaciones, { ...form, id: Date.now().toString(), price: Number(form.price) }];
    setHabitaciones(updatedHabitaciones);
    setLocalStorage("habitaciones", updatedHabitaciones);
    setForm({ id: "", type: "", price: "" });
  };

  const handleEdit = (id: string) => {
    const habitacion = habitaciones.find((h) => h.id === id);
    if (habitacion) setForm({ ...habitacion, price: habitacion.price.toString() });
  };

  const handleDelete = (id: string) => {
    const updatedHabitaciones = habitaciones.filter((h) => h.id !== id);
    setHabitaciones(updatedHabitaciones);
    setLocalStorage("habitaciones", updatedHabitaciones);
  };

  const handleAddRoomType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomType.trim() || roomTypes.includes(newRoomType.trim())) {
      alert("Ingrese un tipo válido y único.");
      return;
    }
    const updatedRoomTypes = [...roomTypes, newRoomType.trim()];
    setRoomTypes(updatedRoomTypes);
    setLocalStorage("roomTypes", updatedRoomTypes);
    setNewRoomType("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Habitaciones</h1>
      <AgregarTipoHabitacion
        newRoomType={newRoomType}
        setNewRoomType={setNewRoomType}
        handleAddRoomType={handleAddRoomType}
      />
      <HabitacionForm form={form} roomTypes={roomTypes} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ListaHabitaciones habitaciones={habitaciones} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default HabitacionesPage;
