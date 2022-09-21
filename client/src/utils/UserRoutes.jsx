import { Outlet, Navigate } from 'react-router-dom'

const UserRoutes = () => {
    return localStorage.getItem('user') ? <Outlet/> : <Navigate to="/"/>;
}

export default UserRoutes;