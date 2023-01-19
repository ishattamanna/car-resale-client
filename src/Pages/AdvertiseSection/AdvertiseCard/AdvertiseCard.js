import React from 'react';

const AdvertiseCard = ({ advertise }) => {

    const { carName, picture, productId, resalePrice } = advertise;

    return (
        <div className="card h-[250px] bg-base-100 shadow-xl image-full">
            <figure><img className='w-full' src={picture} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-5xl font-bold text-yellow-500">{carName}</h2>
                <p className='text-start text-3xl font-bold text-yellow-500'>Price : ${resalePrice}</p>
            </div>
        </div>
    );
};

export default AdvertiseCard;