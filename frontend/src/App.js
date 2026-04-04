import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';

import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from "./pages/Home.tsx";
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Bookings from './pages/Bookings.tsx';

function AppNav() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="app-nav" aria-label="Main">
      <Link to="/" className="app-nav__brand">
        BookAir
      </Link>
      <div className="app-nav__links">
        <NavLink to="/" end>
          Home
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/bookings">Bookings</NavLink>
            <button type="button" className="app-nav__logout" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

function AppRoutes() {
  return (
    <>
      <AppNav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
