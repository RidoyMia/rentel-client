import React, { useState } from 'react';
import { useForm, } from "react-hook-form"
import logo from "../../../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';
function Login(props) {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
       const email = data?.email;
       const password = data?.password;
       fetch('https://server-ten-liard.vercel.app/api/v1/user/login',{
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },body : JSON.stringify({email,password})
       }).then(res => res.json()).then(data =>{
        if(data?.data){
            localStorage.setItem('user',JSON.stringify(data?.result[0]))
            localStorage.setItem('token',JSON.stringify(data?.token))

        const localData = JSON.parse(localStorage.getItem('user'))
        console.log(localData,'localdata')
        if(localData.role){
            navigate(`/${localData.role}/dashboard`)
        }
        
        setLoading(false)
        }
       })
    }
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3">
                <div></div>
                <div className=' shadow-2xl p-10'>
                   <div className='flex justify-center align-middle text-center'>
                      <img src={logo} className='w-[180px] h-[60px]'></img>
                   </div>
                   
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className='flex justify-center  align-middle text-center gap-3 '>
                            <input className='w-full py-3 my-4 px-3' type='email' placeholder='Email' {...register("email")} />
                            <input className='w-full py-3 my-4 px-3' type='password' placeholder='Password' {...register("password")} />
                        </div>
                        
                        <div className='flex justify-center align-middle '>
                            <Link to="/registration" className='underline'>Please Registration</Link>
                        </div>

                        <div className='flex justify-center items-center align-middle'>
                            <button className='py-2 px-10 bg-[#339933] text-white rounded-md mt-4'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;