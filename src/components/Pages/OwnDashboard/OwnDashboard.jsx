import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, } from "react-hook-form"
import Loading from '../../Shared/Loading/Loading';
const api = `bd0f22832703db189e737da27b90a211`
function OwnDashboard() {
  const ownData = JSON.parse(localStorage.getItem('user'))
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState([])
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        
       const name = data?.name;
       const email = ownData?.email;
       const city = data?.city;
       const address = data?.address;
       const bedrooms = parseInt(data?.bedrooms)
       const bathrooms = parseInt(data?.bathrooms)
       const phone = data?.phone;
       const descriptions = data?.descriptions;
       const roomSize = parseInt(data?.roomSize)
       const rent = parseInt(data?.Rent);
       const availability = data?.date;
      
       const image = data?.photo[0];
        const formData = new FormData();
        formData.append('image', image);
      
       axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${api}`, formData).then(result => {
        if (result?.data.data?.url) {
           
            const productDataInfo = {
               
                picture: result?.data?.data.url,
                name,email,city,address,bathrooms,bedrooms,roomSize,phone,descriptions,rent,availability
               
            };
            console.log(productDataInfo,'product info');
           axios.post(`https://server-ten-liard.vercel.app/api/v1/house/create`,{productDataInfo}).then(res =>{
             console.log(res?.data,'created data')
           })
        }
        // console.log(result)
    })
    }
    useEffect(()=>{
       
        axios.get(`https://server-ten-liard.vercel.app/api/v1/house/user/${ownData?.email}`).then(res =>{
            
            setData(res?.data?.result)
            
        })
    },[ownData]);
    
    const deleteHandler = (id)=>{
    //  setLoading(true)
     axios.delete(`https://server-ten-liard.vercel.app/api/v1/house/delete/${id}`).then(res =>{
          console.log(res?.data)
     })
    }
    
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            <div>



{
    data?.map((p,index)=><div className='grid grid-cols-5 gap-x-3 my-5'>
    <div> 
        <img src={p?.picture} className='w-full h-64'></img>
    </div>
    <div>
        <h1>address : {p?.address}</h1>
        <h1>City :{p?.city}</h1>
    </div>
    <div>
        <h1>Price :{p?.rent} </h1>
        <h1>bathrooms : {p?.bathrooms}</h1>
        <h1>bedrooms : {p?.bathrooms}</h1>
    </div>
    <div>
        <p>{p?.descriptions.slice(0,100)}</p>
    </div>
    <div className='flex justify-center items-center align-middle gap-x-3'>
         <button className='bg-red-500 text-white py-2 px-5 rounded-md' onClick={()=>deleteHandler(p?._id)}>Delete</button>
         <button className='bg-green-500 text-white py-2 px-5 rounded-md'>Update</button>
    </div>
</div>)
}







            </div>
           <div className='flex justify-center items-center  align-middle py-10'>
              <button onClick={()=>document.getElementById('my_modal_4').showModal()} className='bg-[#339933] text-white px-12 py-2 rounded-md'>Create-house</button>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg text-center">Create-house!</h3>
           <div className='  py-5 mt-5 px-10'>
           <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-center  align-middle text-center  gap-3'>
                            <input className='w-full py-3 my-4 px-3' type='text' placeholder=' name' {...register("name")} />
                            <input className='w-full py-3 my-4 px-3' type='number' placeholder='Phone'  {...register("phone")} />
                        </div>
                        <div className='flex justify-center  align-middle text-center gap-3 '>
                            <input className='w-full py-3 my-4 px-3' type='text' placeholder='address' {...register("address")} />
                            <input className='w-full py-3 my-4 px-3' type='text' placeholder='city' {...register("city")} />
                           
                        </div>
                        <div className='flex justify-center  align-middle text-center  gap-3'>
                            <input className='w-full py-3 my-4 px-3' type='number' placeholder='Bedrooms' {...register("bedrooms")} />
                            <input className='w-full py-3 my-4 px-3' type='number' placeholder='Bathrooks'  {...register("bathrooms")} />
                        </div>
                        <div className='flex justify-center  align-middle text-center  gap-3'>
                            <input className='w-full py-3 my-4 px-3' type='number' placeholder='RoomSize sq' {...register("roomSize")} />
                            <input className='w-full py-3 my-4 px-3' type='number' placeholder='PerMonth'  {...register("Rent")} />
                        </div>
                        <div className='flex justify-center  align-middle text-center  gap-3'>
                            <input className='w-full py-3 my-4 px-3' value={ownData?.email} type='email' placeholder='Password' {...register("email")} />
                            <input className='w-full py-3 my-4 px-3' type='date' placeholder='Date'  {...register("date")} />
                        </div>
                        <div className='flex justify-center  align-middle text-center  gap-3'>
                            <input className='w-full py-3 my-4 px-3' type='file' placeholder='Password' {...register("photo")} />
                            <textarea className='w-full py-3 my-4 px-3' type='text' placeholder='Descriptions'  {...register("descriptions")} />
                        </div>

                        <div className='flex justify-center items-center align-middle'>
                            <button className='py-2 px-10 bg-[#339933] text-white rounded-md mt-4'>Registration</button>
                        </div>
                    </form>
           </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
            </div> 
        </div>
    );
}

export default OwnDashboard;