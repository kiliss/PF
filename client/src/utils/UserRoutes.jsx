import { Outlet, Navigate } from 'react-router-dom';

const UserRoutes = () => {
    return localStorage.getItem('session') ? <Outlet/> : <Navigate to="/"/>;
}

export default UserRoutes;