import React from 'react';
import Loader from '../../../../CustomComponents/Loader';
import UseBookingCheck from '../../../../Hooks/UseBookingCheck';
import UsePaidCheck from '../../../../Hooks/UsePaidCheck';

const OrdersRow = ({ order, decimal, setPayingProduct, handleDeleteOrder }) => {



    const { productName, picture, price, productId } = order;

    const { bookingCheckRefetch } = UseBookingCheck(productId)
    const { isPaid, paidLoading } = UsePaidCheck(productId);

    if (paidLoading) {
        return <Loader></Loader>
    }

    return (
        <tr>
            <th>
                <button disabled={isPaid.message === 'paid'} onClick={() => handleDeleteOrder(order, bookingCheckRefetch)} className="btn btn-circle bg-red-700 text-black font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <th>{decimal + 1}</th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={picture} alt='' />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{productName}</div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{price}</div>
                </div>
            </td>
            <th>
                <button onClick={() => setPayingProduct(order)} disabled={isPaid?.message === 'paid'}>
                    <label className={`btn ${isPaid?.message === 'paid' ? 'btn-success' : 'btn-error'} btn-xs`} htmlFor="paymentModal">{
                        isPaid?.message === 'paid' ?
                            'paid'
                            :
                            'pay'
                    }</label>
                </button>
            </th>
        </tr >
    );
};

export default OrdersRow;