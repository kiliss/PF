import { Outlet, Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AdminRoutes = () => {
    const { admin } = localStorage.getItem('user') ? jwt_decode(localStorage.getItem('user')) : { 'admin': false };
    return localStorage.getItem('user') && admin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;