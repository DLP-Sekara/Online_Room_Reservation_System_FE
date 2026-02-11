import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import ServerError from '../pages/errorPages/ServerError';
 

const Routers = () => { 

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Routers;
