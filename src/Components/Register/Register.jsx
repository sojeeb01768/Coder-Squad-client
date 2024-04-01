import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProviders";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Register = () => {

    const {
        register, handleSubmit, watch, formState: { errors }, reset} = useForm();
        const navigate = useNavigate();
        const {createUser}= useContext(AuthContext);

    const handleSignUp = (data) => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result =>{
            const loggedUser = reset.user;
            updateUser(result.user,data.name)
            reset();
            navigate('/')
            console.log(loggedUser);
        })
        
    }
    const updateUser = (user, name) => {
        updateProfile(user, {
            displayName: name,
        })
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }

    // console.log(watch("example"))
    // const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className="md:flex justify-center items-center mt-40 lg:mt-32 ">


            <div className='bg-white p-6 rounded-md shadow-lg border  border-[#f5e7e7]'>
                <h1 className=" text-center text-slate-600 font-bold text-3xl my-10">Sign Up</h1>

                <form onSubmit={handleSubmit(handleSignUp)} className='space-y-4'>
                    <input type="name" {...register("name", { required: true, pattern: /^[A-Z a-z]+$/i })} name="name" className='block w-full p-3 border rounded-md focus:outline-[#2D9596]' placeholder='Name' />
                    {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                    <input type="email" {...register("email", { required: true })} name="email" className='block w-full p-3 border rounded-md focus:outline-[#2D9596]' placeholder='Email Address' />
                    {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                    <input type="password" name="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ })} className='block w-full p-3 border rounded-md focus:outline-[#2D9596]' placeholder='Password' />
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            {errors.password.type === "required" && "Password is required. "}
                            {errors.password.type === "minLength" && "Password must be at least 6 characters long. "}
                            {errors.password.type === "pattern" && "Password must contain at least one digit and one special character. "}
                        </span>
                    )}

                    <button type="submit" className='block w-full md:w-96 p-3 text-white font-bold bg-slate-600 rounded-md'>Sign Up</button>
                </form>

                <hr className='my-5' />
                <div className='flex justify-center '>
                    <Link to='/login'>
                    <button className=' w-full text-lg font-bold text-slate-600 py-3 rounded-md'  >Already have any account?</button>
                    </Link>
                </div>

            </div>


        </div>
    );
};

export default Register;