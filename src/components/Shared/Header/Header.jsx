import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../../assets/logo.png"
import Loading from '../Loading/Loading';
function Header() {
  const [loading,setLoading] = useState(false)
const [owner,setOwner] = useState(null)
  useEffect(()=>{
    const localdata = JSON.parse(localStorage.getItem('user'))
   
   setOwner(localdata)
  },[])
  console.log(owner,'from header')
 const logOut= ()=>{
  setLoading(true)
  localStorage.removeItem('user')
  setLoading(false)
 }
 if(loading){
  return <Loading></Loading>
 }
    return (
        <div>
            <div className="navbar bg-base-200">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul id="sidebar" tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Home
</NavLink>
{
  owner ?  "" : <NavLink
  to="/login"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Login
</NavLink>
}
{
  owner ? <button onClick={logOut} className='px-2 py-2 bg-gray-200 rounded-2xl text-md font-semibold mx-6'>LogOut</button> : ""
}
{
  owner ? <NavLink
  to={`${owner?.role}/dashboard`}
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Dashboard
</NavLink> : ""
}
      </ul>
    </div>
    <a className=""><img src={logo} className='w-[180px] h-[60px]'></img></a>
  </div>
  <div className="navbar-end hidden md:block lg:flex">
    <ul id="sidebar" className="menu menu-horizontal px-1">
    <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Home
</NavLink>
{
  owner ?  "" : <NavLink
  to="/login"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Login
</NavLink>
}
{
  owner ? <button onClick={logOut} className='px-2 py-2 bg-gray-200 rounded-2xl text-md font-semibold mx-6'>LogOut</button> : ""
}
{
  owner ? <NavLink
  to={`${owner?.role}/dashboard`}
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Dashboard
</NavLink> : ""
}
    </ul>
  </div>
 
</div>
        </div>
    );
}

export default Header;