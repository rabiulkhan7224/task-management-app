import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
const{signInWithGoogle,login}=useAuth()
    const [showpassword, setShowpassword] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const form = location?.state?.from.pathname || '/'

    const { register, handleSubmit, } = useForm()

    const onSubmits =  async(data) => {
        if (data) {
            try {
                await login(data.email, data.password)
                toast.success('login successful')
                navigate(form, { replace: true })
            } catch (error) {
                toast.error(error.message)

            }
        }
    }
    const handleSigninWithGoogle =async () => {
        try {
           await signInWithGoogle()
           toast.success('login successful')
           navigate(form, { replace: true })
        } catch (error) {
            toast.error(error.message)
        }
        
    }
    return (
        <div className="hero bg-base-200 min-h-screen">

        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <h1 className="text-3xl font-bold text-center">Login now!</h1>



            <form onSubmit={handleSubmit(onSubmits)} className="card-body">

                <div className="form-control">
                    <label className="fieldset-label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register('email')} type="email" name="email"   placeholder="email" className="input input-bordered" required />
                </div>

                <div className="form-control relative">
                    <label className="fieldset-label">
                        <span className="label-text">Password</span>
                    </label>
                    <input {...register('password')} type={showpassword ? 'text' : 'password'} placeholder="password" name="password" className="input input-bordered" required />
                    <a><button onClick={() => setShowpassword(!showpassword)} className="btn btn-xs absolute right-4 top-12">{showpassword ? <FaEyeSlash /> : <FaEye />}
                    </button></a>
                </div>
                <div className="form-control text-center  mt-6">
                    <button type="submit" className="btn w-full    ">Login</button>
                </div>
            </form>
            <p className="text-red-500"></p>
            <h2 className="text-center">Don t have an account? <Link to={'/register'} className="text-blue-500 hover:underline">Register</Link></h2>
            


            {/* <button onClick={handleSigninwithGoogle} className="btn w-11/12 mx-auto "><FcGoogle /> Sign in with Google</button> */}

            <hr />
            <button onClick={handleSigninWithGoogle} className="btn w-11/12 mx-auto mb-3 "><FcGoogle />Sign in with Google</button>
        </div>

    </div>
    );
};

export default Login;