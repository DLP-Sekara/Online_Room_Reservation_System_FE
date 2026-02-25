import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import ServerError from '../pages/errorPages/ServerError';
import MainDashboard from '../pages/dashboard/MainDashboard';
import DashboardLayout from '../layout/DashboardLayout';

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<MainDashboard />} />
      </Route>
    </Routes>
  );
};

export default Routers;
