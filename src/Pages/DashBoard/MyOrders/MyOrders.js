import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loader from '../../../CustomComponents/Loader';
import OrdersRow from './OrdersRow/OrdersRow';
import PaymentModal from './OrdersRow/PaymentModal/PaymentModal';

const MyOrders = () => {

    const { user } = useContext(AuthContext);
    const [payingProduct, setPayingProduct] = useState(null);


    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('resale token')}`
            }
        })
            .then(res => res.json())
    });


    const handleDeleteOrder = (deletingOrder, bookingCheckRefetch) => {
        confirmAlert({
            title: 'Confirm to Cancel',
            message: "Are you sure? You want to cancel this Order.",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://resaledotcom-server.vercel.app/orders/${deletingOrder._id}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `bearer ${localStorage.getItem('resale token')}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                if (data.acknowledged) {
                                    toast.success('Order cancelled');
                                    bookingCheckRefetch();
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


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='w-full mt-10'>
            <p className='text-5xl my-5 font-bold text-start text-white ml-5'>My Orders</p>
            <div data-theme="synthwave" className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            orders.map((order, i) => <OrdersRow
                                key={order._id}
                                decimal={i}
                                order={order}
                                setPayingProduct={setPayingProduct}
                                handleDeleteOrder={handleDeleteOrder}
                            ></OrdersRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                payingProduct &&
                <PaymentModal
                    setPayingProduct={setPayingProduct}
                    payingProduct={payingProduct}
                ></PaymentModal>
            }
        </div>
    );
};

export default MyOrders;