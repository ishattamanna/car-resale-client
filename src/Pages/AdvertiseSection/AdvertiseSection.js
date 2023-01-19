import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../CustomComponents/Loader';
import AdvertiseCard from './AdvertiseCard/AdvertiseCard';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdvertiseSection = () => {

    const navigate = useNavigate();


    const { data: advertises = [], isLoading } = useQuery({
        queryKey: ['advertisingProducts'],
        queryFn: () => fetch('https://resaledotcom-server.vercel.app/advertisingProducts?limit=3')
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loader></Loader>
    };

    if (advertises.length === 0) {
        return;
    }

    return (
        <div className='mt-10'>
            <p className='text-5xl font-bold text-start mb-5 text-white'>Advertises</p>
            <div className='grid grid-cols-1 gap-5'>
                {
                    advertises.map(advertise => <AdvertiseCard
                        key={advertise._id}
                        advertise={advertise}
                    ></AdvertiseCard>)
                }
            </div>
            <p onClick={() => navigate('/alladvertise')} className='flex justify-end items-center text-end text-2xl font-bold w-full mt-2 cursor-pointer'>
                <span>Show All</span>
                <FaArrowRight className='ml-2'></FaArrowRight>
            </p>
        </div>
    );
};

export default AdvertiseSection;