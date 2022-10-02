import { Outlet, Navigate } from 'react-router-dom';

const VisitorRoutes = () => {
    return !localStorage.getItem('session') ? <Outlet/> : <Navigate to="/"/>;
}

export default VisitorRoutes;