import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";


const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    const location=useLocation()
    if(user) return children
    if(loading) return <Loader></Loader>
    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default PrivateRoute;