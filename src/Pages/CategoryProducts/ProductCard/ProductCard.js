import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { FaNotesMedical } from 'react-icons/fa';
import Loader from '../../../CustomComponents/Loader';
import UseBookingCheck from '../../../Hooks/UseBookingCheck';
import { useQuery } from '@tanstack/react-query';

const ProductCard = ({ product, setBookingProduct, handleReport }) => {

    const {
        _id,
        carName,
        location,
        resalePrice,
        originalPrice,
        yearOfUse,
        postedTime,
        sellerName,
        sellerEmail,
        isVerified,
        picture
    } = product;

    const { isOrdered, bookingCheckLoading } = UseBookingCheck(_id);

    const { data: seller } = useQuery({
        queryKey: ['users', sellerEmail],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/users?email=${sellerEmail}`)
            .then(res => res.json())
    })

    if (bookingCheckLoading) {
        return <Loader></Loader>
    }

    return (
        <div className="card card-compact shadow-xl">
            <div onClick={() => handleReport(product)} className='flex items-center justify-evenly py-2 px-5 bg-violet-400 rounded-lg cursor-pointer'>
                <FaNotesMedical title='Report to Admin' className='w-[60px] text-4xl text-red-800' />
                <p className='font-bold text-2xl text-red-800'>Report to Admin</p>
            </div>
            <figure><img className='w-full h-[300px]' src={picture} alt="Shoes" /></figure>
            <div className="card-body text-start text-black bg-violet-400">
                <h2 className="card-title text-2xl font-bold">{carName}</h2>
                <p className='text-xl'>Resale Price : <span className='font-bold'>$ {resalePrice}</span></p>
                <p className='text-xl'>Original Price : <span className='font-bold'>$ {originalPrice}</span></p>
                <p className='text-xl'>years of use: {yearOfUse}</p>
            </div>
            <div className='flex items-center justify-between px-5 py-2 bg-violet-400'>
                <div className='text-start'>
                    <p className='text-xl text-black'>Seller Name: {sellerName}</p>
                    <p className='text-xl text-black'>Location : {location}</p>
                    <p className='text-xl text-black'>Posted Date : {postedTime}</p>
                </div>
                {
                    (isVerified || seller?.isVerified) && <CheckCircleIcon className="h-[60px] w-[60px] text-blue-600" />
                }
            </div>
            <button onClick={() => setBookingProduct(product)} disabled={isOrdered?.message === 'alreadyBooked'}>
                <label htmlFor="bookNowModal" className={`btn ${isOrdered.message === 'alreadyBooked' ? 'bg-red-900' : 'bg-black'} font-bold w-full`}>{isOrdered?.message === 'alreadyBooked' ? 'Already Booked' : 'Book Now'}</label>
            </button>
        </div>
    );
};

export default ProductCard;