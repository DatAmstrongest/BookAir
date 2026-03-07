import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home.tsx";
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
