// File: src/components/Navigation.tsx
import { Link } from "react-router";

const Navigation = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 w-full">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="hover:underline">Inicio</Link>
        </li>
        <li>
          <Link to="/clientes" className="hover:underline">Clientes</Link>
        </li>
        <li>
          <Link to="/habitaciones" className="hover:underline">Habitaciones</Link>
        </li>
        <li>
          <Link to="/reservas" className="hover:underline">Reservas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
