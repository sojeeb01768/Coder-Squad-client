import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProviders";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";


const Login = () => {
    const {
        register, handleSubmit, watch, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }
    const { signIn } = useContext(AuthContext);

   

    return (
        <div>
            <div className='md:flex justify-center items-center mt-40 lg:mt-32'>
            <div className='bg-white p-6 rounded-md shadow-lg border  border-[#f5e7e7]'>
                        <h1 className=" text-center font-bold text-slate-600 text-3xl my-10">Sign In</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                            <input type="email" {...register("email", { required: true })} name="email" className='block w-full p-3 border rounded-md focus:outline-[#2D9596]' placeholder='Email Address' />
                            {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                            <input type="password" name="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ })} className='block w-full p-3 border rounded-md focus:outline-[#2D9596]' placeholder='Password' />
                            {errors.password && <span className="text-xs text-red-500">Password is required</span>}
                            <button type="submit" className='block w-full md:w-96 p-3 text-white font-bold bg-slate-600 rounded-md'>Sign Up</button>
                        </form>

                        <hr className='my-5' />
                        
                        <div className='flex justify-center '>
                            <Link to='/register'>
                            <button className=' w-full text-lg font-bold text-slate-600 py-3 rounded-md'  >Do not have any account?</button>
                            </Link>
                        </div>
                    </div>
        </div>
        </div>
    );
};

export default Login;