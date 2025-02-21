import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem('login') === 'true';

  return isLoggedIn ? <Outlet /> : <Navigate to="/participant/login" replace />;
};

export default ProtectedRoute;