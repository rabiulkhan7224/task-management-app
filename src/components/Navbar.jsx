import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";


const Navbar = () => {

const {user,  logout,}=useAuth()
const navigate = useNavigate()
    const handlelogOut =async () => {
        try {
            await logout()
            toast.success('logout user')    
                navigate('/')
        } catch (error) {
            console.log(error.message)
        }
        
            
    }

    const link = <>
        <li><NavLink className={({ isActive }) =>
            isActive ? "text-blue-600  shadow-lg " : "text-black "
        } to={'/'}>Home</NavLink></li>
        <li><NavLink  className={({ isActive }) =>
            isActive ? "text-blue-600  shadow-lg " : "text-black"
        } to={'/dashboard'}>Dashboard</NavLink></li></>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {link}
      </ul>
    </div>
    <a className=" text-xl font-bold">TaskPad </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {link}
    </ul>
  </div>
  <div className="navbar-end">
  {user ? <div className="dropdown dropdown-hover relative">
                        <div tabIndex={0} role="button" className=""><div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                                <img 
                                 referrerPolicy='no-referrer'
                                src={user?.photoURL} 
                                alt='User Profile Photo'/>
                            </div>
                        </div></div>
                        <ul tabIndex={0} className=" right-0 dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li className="text-center font-semibold"><a >{user.displayName}</a></li>
                            <li  ><button onClick={handlelogOut} className="btn btn-warning">Log Out</button></li>
                            <li><Link to={'/dashboard'} className="btn">Dashboard</Link></li>
                        </ul>
                    </div> : <Link className="btn btn-ghost" to={'/login'}>Login</Link>}
    
    
  </div>
</div>
        </div>
    );
};

export default Navbar;