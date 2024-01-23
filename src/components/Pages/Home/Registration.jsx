import React, { useState } from 'react';
import { useForm, } from "react-hook-form"
import logo from "../../../assets/logo.png"
import { Link, json, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
function Registration(props) {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        setLoading(true)
        const fullname = data?.name;
        const phone = parseInt(data?.phone)
        const email = data?.email;
        const role = data?.role;
        const password = data?.password;
        const confirm = data?.confirm;
        const userData = {
            fullname,
            phone,email,role,password
        }
        
        if(password !==confirm){
            console.log('dont match')
        }else{
            fetch('https://server-ten-liard.vercel.app/api/v1/user/create',{
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(userData)
            }).then(res => res.json()).then(data =>{
                console.log(data)
                if(data?.data){
                    localStorage.setItem('user',JSON.stringify(data?.result))

                const localData = JSON.parse(localStorage.getItem('user'))
                console.log(localData,'localdata')
                if(localData.role){
                    navigate(`/${localData.role}/dashboard`)
                }
                
                setLoading(false)
                }
            })
        }
    }
    if(loading){
        return <Loading></Loading>
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
                        <div className='flex justify-center  align-middle text-center  gap-3'>
                            <input className='w-full py-3 my-4 px-3' type='text' placeholder='full name' {...register("name")} />
                            <input className='w-full py-3 my-4 px-3' type='number' placeholder='Phone'  {...register("phone")} />
                        </div>
                        <div className='flex justify-center  align-middle text-center gap-3 '>
                            <input className='w-full py-3 my-4 px-3' type='email' placeholder='Email' {...register("email")} />
                            <select className='w-full py-1' {...register("role")}>
                                <option value="House_Owner">House Owner</option>
                                <option value="House_Rente">House Rente</option>
                               
                            </select>
                        </div>
                        <div className='flex justify-center  align-middle text-center  gap-3'>
                            <input className='w-full py-3 my-4 px-3' type='password' placeholder='Password' {...register("password")} />
                            <input className='w-full py-3 my-4 px-3' type='password' placeholder='confirm'  {...register("confirm")} />
                        </div>
                        <div className='flex justify-center align-middle '>
                            <Link to="/login" className='underline'>Please login</Link>
                        </div>

                        <div className='flex justify-center items-center align-middle'>
                            <button className='py-2 px-10 bg-[#339933] text-white rounded-md mt-4'>Registration</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;