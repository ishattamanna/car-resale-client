import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import Loader from '../../../CustomComponents/Loader';
import ReportedProductRow from './ReportedProductRow/ReportedProductRow';

const ReportedProducts = () => {

    const { data: reports = [], isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/reports`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('resale token')}`
            }
        })
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loader></Loader>
    };

    const handleDeleteProduct = (product) => {
        // fetch(`https://resaledotcom-server.vercel.app/products/${product.}`)
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure? You want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://resaledotcom-server.vercel.app/products/${product.productId}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `bearer ${localStorage.getItem('resale token')}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);

                                if (
                                    data.adverderDeleted.acknowledged ||
                                    data.productDeleted.acknowledged ||
                                    data.orderDeleted.acknowledged
                                ) {
                                    refetch();
                                    toast.success('Item deleted successfully');
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
        <div data-theme="synthwave" className='w-full mt-10'>
            <p className='text-5xl my-5 font-bold text-start text-white ml-5'>Reported Products</p>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Delete Product</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Seller's Email</th>
                            <th>Seller's Name</th>
                            <th>Reporter's Name</th>
                            <th>Reporter's Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            reports.map((report, i) => <ReportedProductRow
                                key={report._id}
                                report={report}
                                decimal={i}
                                handleDeleteProduct={handleDeleteProduct}
                            ></ReportedProductRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedProducts;