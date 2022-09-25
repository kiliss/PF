import { Outlet, Navigate } from 'react-router-dom'

const VisitorRoutes = () => {
    return !localStorage.getItem('user') ? <Outlet/> : <Navigate to="/"/>;
}

export default VisitorRoutes;