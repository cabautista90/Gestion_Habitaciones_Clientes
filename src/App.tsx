import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ClientesPage from './pages/ClientesPage';
import HabitacionesPage from './pages/HabitacionesPage';
import ReservasPage from './pages/ReservasPage';
import './App.css'

function App() {
  return (
    <Router>
      
      <div>
        <Navigation />  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/habitaciones" element={<HabitacionesPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
