import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import ServerError from '../pages/errorPages/ServerError';
import MainDashboard from '../pages/dashboard/MainDashboard';
import DashboardLayout from '../layout/DashboardLayout';
import Reservations from '../pages/reservations/Reservations';
import Rooms from '../pages/rooms/Rooms';
import MealManagement from '../pages/mealManagement/MealManagement';
import BillingReport from '../pages/billingReport/BillingReport';
import Users from '../pages/users/Users';
import Settings from '../pages/settings/Settings';

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<MainDashboard />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="meal-management" element={<MealManagement />} />
        <Route path="billing-report" element={<BillingReport />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default Routers;
