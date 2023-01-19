import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../../Contexts/AuthProvider';
import CheckOutForm from './CheckOutForm/CheckOutForm';


const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

console.log(stripePromise);
const PaymentModal = ({ payingProduct, setPayingProduct }) => {
    console.log(stripePromise);
    const { user } = useContext(AuthContext)

    const { productName, picture, price, clientName, clientEmail, productId } = payingProduct;
    return (
        <div>
            <input type="checkbox" id="paymentModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="paymentModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <h3 className="font-bold text-start text-white font bold lg:text-3xl">Client Info</h3>
                        <div className='flex mt-2'>
                            <div className="avatar">
                                <div className="w-16 rounded">
                                    <img src={user?.photoURL} alt='' />
                                </div>
                            </div>
                            <div className='text-start text-white lg:text-2xl mx-2'>
                                <p className="">Client's Name : {clientName}</p>
                                <p className="">Client's Email : {clientEmail}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h3 className="font-bold text-start text-white lg:text-3xl">Product Info</h3>
                        <div className='flex mt-2'>
                            <div className="avatar">
                                <div className="w-32 rounded">
                                    <img src={picture} alt='' />
                                </div>
                            </div>
                            <div className='text-start text-white lg:text-2xl mx-2'>
                                <p className="">Name : {productName}</p>
                                <p className="">Price : {price}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h3 className="font-bold text-start text-white lg:text-3xl">Payment Info</h3>
                        <div className='mt-2 w-full'>
                            <Elements stripe={stripePromise}>
                                <CheckOutForm payingProduct={payingProduct} setPayingProduct={setPayingProduct} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;