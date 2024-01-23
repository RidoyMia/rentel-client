import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

function Services(props) {
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([]);
    useEffect(()=>{
        setLoading(true)
        axios.get('https://server-ten-liard.vercel.app/api/v1/house/all/house').then(res =>{
            console.log(res.data)
            setData(res?.data?.result)
            setLoading(false)
        })
    },[])
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-center py-10 text-xl '>Choose your dream house</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-5'>
                {
                   data?.map(p=><div className="card card-compact  bg-base-100 shadow-xl">
                   <figure><img src={p?.picture} alt="Shoes" /></figure>
                   <div className="card-body">
                     <h2 className="card-title">{p?.city}</h2>
                     <p>{p?.descriptions?.slice(0,120)}</p>
                     <div className="card-actions justify-end">
                       <button className="btn btn-primary">Buy Now</button>
                     </div>
                   </div>
                 </div>)
                }
            </div>
        </div>
    );
}

export default Services;