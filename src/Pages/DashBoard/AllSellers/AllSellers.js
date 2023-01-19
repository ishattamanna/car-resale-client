import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import Loader from '../../../CustomComponents/Loader';
import AllSellersRow from './AllSellersRow/AllSellersRow';

const AllSellers = () => {

    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('https://resaledotcom-server.vercel.app/users?role=seller', {
            headers: {
                authorization: `bearer ${localStorage.getItem('resale token')}`
            }
        })
            .then(res => res.json())
    });


    if (isLoading) {
        return <Loader></Loader>
    }

    const handleVerificationStatus = (seller) => {
        fetch(`https://resaledotcom-server.vercel.app/users/${seller._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('resale token')}`
            },
            body: JSON.stringify(seller)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    refetch();
                }
            })

    };

    const handleDeleteSeller = (deletingSeller) => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: "Are you sure? You want to delete this Seller's Account.",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://resaledotcom-server.vercel.app/users/${deletingSeller._id}`, {
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
            <p className='text-5xl my-5 font-bold text-start text-white ml-5'>All Sellers</p>
            <div data-theme="synthwave" className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>#</th>
                            <th>Image</th>
                            <th>Seller's Name</th>
                            <th>Seller's Email</th>
                            <th>Verification Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            sellers.map((seller, i) => <AllSellersRow
                                key={seller._id}
                                decimal={i}
                                seller={seller}
                                handleVerificationStatus={handleVerificationStatus}
                                handleDeleteSeller={handleDeleteSeller}
                            ></AllSellersRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;