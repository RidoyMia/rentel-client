import React from 'react';

function Loading(props) {
    return (
        <div className='flex justify-center items-center align-middle py-10'>
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
}

export default Loading;