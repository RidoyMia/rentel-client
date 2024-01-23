import React from 'react';
import './Banner.css'

function Banner() {
    return (
        <div className='banner-container'>
             <div className='lg:py-52 md:py-48 py-32'>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3'>
                    <div></div>
                    <div>
                        <form>
                            <div className='flex justify-center items-center align-middle px-10'>
                            <input type='text' placeholder='Search' name='search' className='py-3 px-5 w-80 rounded-2xl'></input>
                            <button className='py-3 bg-[#339933] px-5 rounded-2xl text-white -ml-11'>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
             </div>
        </div>
    );
}

export default Banner;