import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Main = () => {
    return (
        <div className="container mx-auto">
            <Navbar></Navbar>
           
            <Outlet></Outlet>
            
           
        </div>
    );
};

export default Main;