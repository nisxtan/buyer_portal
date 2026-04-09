import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PropertyDetails from './pages/PropertyDetails';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
    <Toaster position="top-center" />
    </>
  );
}

export default App;
