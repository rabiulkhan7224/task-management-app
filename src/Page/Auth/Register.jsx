import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";


const Register = () => {
    const { signInWithGoogle, registerUser, updateUserProfile } = useAuth()

    const [showpassword, setShowpassword] = useState(false)
  
    const navigate = useNavigate()
   

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmits = async (data) => {
        if (data) {




            try {
                await registerUser(data.email, data.password)

                await updateUserProfile(data.name, data.photo)



               
                toast.success('Register successful')
                navigate('/')
                reset()
            } catch (error) {
                console.log(error.message)
            }
        }
    }
    const handleSigninWithGoogle = async () => {
        try {
            await signInWithGoogle()
            toast.success('login successful')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <div className="hero bg-base-200 min-h-screen">

            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                <h1 className="text-3xl font-bold text-center">Register now!</h1>



                <form onSubmit={handleSubmit(onSubmits)} className="card-body">
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 "> Name</label>
                        <input {...register('name', { required: true })} type="text" placeholder="full name" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-700 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        {errors.name?.type === 'required' && <p className="text-red-600">Name is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="fieldset-label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register('email')} type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Profile photo Url</label>
                                <input {...register('photo', { required: true })} type="url" placeholder="Photo url" className="file-input file-input-bordered w-full max-w-xs" />
                                {errors.photo?.type === 'required' && <p className="text-red-600">Photo url is required</p>}
                            </div>

                    <div className="form-control relative">
                        <label className="fieldset-label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password', {
                            required: true,
                            minLength: 6,
                            maxLength: 15,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} type={showpassword ? 'text' : 'password'} placeholder="password" name="password" className="input input-bordered" required />
                        <label>  {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 15 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}</label>
                        <a><button onClick={() => setShowpassword(!showpassword)} className="btn btn-xs absolute right-4 top-12">{showpassword ? <FaEyeSlash /> : <FaEye />}
                        </button></a>
                    </div>
                    <div className="form-control text-center  mt-6">
                        <button type="submit" className="btn w-full    ">Register</button>
                    </div>
                </form>
                <p className="text-red-500"></p>
                <h2 className="text-center"> already an account? <Link to={'/login'} className="text-blue-500 hover:underline">Register</Link></h2>



                {/* <button onClick={handleSigninwithGoogle} className="btn w-11/12 mx-auto "><FcGoogle /> Sign in with Google</button> */}

                <hr />
                <button onClick={handleSigninWithGoogle} className="btn w-11/12 mx-auto mb-3 "><FcGoogle />Sign in with Google</button>
            </div>

        </div>
    );
};

export default Register;