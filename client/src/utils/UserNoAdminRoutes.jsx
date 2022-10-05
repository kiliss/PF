import { Outlet, Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const AdminRoutes = () => {
    const { admin } = localStorage.getItem('session') ? jwt_decode(localStorage.getItem('session')) : { 'admin': false };
    return localStorage.getItem('session') && !admin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;