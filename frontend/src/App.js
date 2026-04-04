import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';

import './App.css';
import Home from "./pages/Home.tsx";
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Bookings from './pages/Bookings.tsx';

function App() {
  const [token, setToken] = useState();

  return (
    <BrowserRouter>
      <nav className="app-nav" aria-label="Main">
        <Link to="/" className="app-nav__brand">
          BookAir
        </Link>
        <div className="app-nav__links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/bookings">Bookings</NavLink>
        </div>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
