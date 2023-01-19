import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import Loader from '../../../CustomComponents/Loader';
import AllBuyersRow from './AllBuyersRow/AllBuyersRow';

const AllBuyers = () => {

    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('https://resaledotcom-server.vercel.app/users?role=buyer', {
            headers: {
                authorization: `bearer ${localStorage.getItem('resale token')}`
            }
        })
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loader></Loader>
    };

    const handleDeleteBuyer = (deletingBuyer) => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: "Are you sure? You want to delete this Buyer's Account.",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://resaledotcom-server.vercel.app/users/${deletingBuyer._id}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `bearer ${localStorage.getItem('resale token')}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                if (data.acknowledged) {
                                    toast.success('Seller deleted Successfully');
                                    refetch();
                                }
                            })

                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return;
                    }
                }
            ]
        });
    }


    return (
        <div className='w-full mt-10'>
            <p className='text-5xl my-5 font-bold text-start text-white ml-5'>All Buyers</p>

            <div data-theme="synthwave" className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>#</th>
                            <th>Image</th>
                            <th>Buyer's Name</th>
                            <th>Buyer's Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            buyers.map((buyer, i) => <AllBuyersRow
                                key={buyer._id}
                                buyer={buyer}
                                decimal={i}
                                handleDeleteBuyer={handleDeleteBuyer}
                            ></AllBuyersRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;