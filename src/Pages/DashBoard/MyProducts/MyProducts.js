import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loader from '../../../CustomComponents/Loader';
import MyProductsRow from './MyProductsRow/MyProductsRow';

const MyProducts = () => {


    const { user } = useContext(AuthContext);


    const { data: myProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/products?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('resale token')}`
            }
        })
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loader></Loader>
    };


    const handleDelete = (deletingProduct) => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure? You want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://resaledotcom-server.vercel.app/products/${deletingProduct._id}`, {
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
    };

    const handleAdvertise = (product, advertisingRefetch) => {

        const { _id, picture, carName, resalePrice } = product;

        const advertisingProduct = {
            productId: _id,
            picture,
            carName,
            resalePrice
        }

        confirmAlert({
            title: 'Confirm to Advertise',
            message: 'Are you sure? You want to advertise this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://resaledotcom-server.vercel.app/advertisingProducts`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `bearer ${localStorage.getItem('resale token')}`
                            },
                            body: JSON.stringify(advertisingProduct)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                if (data.acknowledged) {
                                    advertisingRefetch();
                                    toast.success('product advertised Successfully');
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
            <p className='text-5xl my-5 font-bold text-start text-white ml-5'>My Products</p>
            <div data-theme="synthwave" className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>#</th>
                            <th>Image</th>
                            <th>Car Name</th>
                            <th>Resale Price</th>
                            <th>Sales Status</th>
                            <th>Advertisement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            myProducts.map((myProduct, i) => <MyProductsRow
                                decimal={i}
                                key={myProduct._id}
                                myProduct={myProduct}
                                handleDelete={handleDelete}
                                handleAdvertise={handleAdvertise}
                            ></MyProductsRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;