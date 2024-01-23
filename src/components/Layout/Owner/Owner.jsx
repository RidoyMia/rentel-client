import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Owner() {
    const navigate = useNavigate()
    const [loadng,setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true)
        const localdata = JSON.parse(localStorage.getItem('user'))
        if(localdata?.fullname){
            setLoading(false)
        }
        else{
           navigate('/')
        }
    },[])
    return (
        <div>
            <div className='grid grid-cols-4 '>
                <div className='col-span-0'>
                    <div>
                        
                        <button className='px-5 py-2 rounded-sm text-md mt-3 bg-base-200 shadow-md hover:bg-[#339933]'><Link to='/House_Owner/dashboard'>Dashboard</Link></button><br />
                        
                        <button className='px-5 py-2 rounded-sm text-md mt-3 bg-base-200 shadow-md hover:bg-[#339933]'><Link to="/">Home</Link></button> <br />
                    </div>
                </div>
                <div className='col-span-3'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}

export default Owner;