import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../../CustomComponents/Loader';
import AdvertiseCard from '../AdvertiseCard/AdvertiseCard';

const AllAdvertise = () => {

    const { data: allAdvertises = [], isLoading } = useQuery({
        queryKey: ['advertisingProducts'],
        queryFn: () => fetch('https://resaledotcom-server.vercel.app/advertisingProducts')
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='my-10 lg:w-[90%] px-[10px] lg:px-0 lg:mx-auto'>
            <p className='text-5xl font-bold mb-5 bg-gray-500 rounded-lg p-5'>Advertises</p>
            <div className='grid grid-cols-1 gap-5'>
                {
                    allAdvertises.map(advertise => <AdvertiseCard
                        key={advertise._id}
                        advertise={advertise}
                    ></AdvertiseCard>)
                }
            </div>
        </div>
    );
};

export default AllAdvertise;