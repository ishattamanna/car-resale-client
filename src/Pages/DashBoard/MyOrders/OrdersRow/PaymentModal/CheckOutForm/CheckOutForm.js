import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UsePaidCheck from '../../../../../../Hooks/UsePaidCheck';

const CheckOutForm = ({ payingProduct, setPayingProduct }) => {

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();



    const { productName, picture, price, clientName, clientEmail, productId, _id } = payingProduct;

    const { paidRefetch } = UsePaidCheck(productId);

    useEffect(() => {
        fetch("https://resaledotcom-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        };
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: clientName,
                        email: clientEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            const payment = {
                price,
                transactionId: paymentIntent.id,
                clientEmail,
                clientName,
                bookingId: _id,
                productName,
                picture,
                productId
            }
            fetch('https://resaledotcom-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setPayingProduct(null);
                        Swal.fire('Payment Successful',
                            `Transaction Id: ${paymentIntent.id}`
                        );
                        paidRefetch();
                    }
                })
        }

        setProcessing(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='text-white font-bold'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#FFFFFF',
                                '::placeholder': {
                                    color: '#FFFFFF',
                                },
                            },
                            invalid: {
                                color: '#FFFFFF',
                            },
                        },
                    }}
                />
                <button className='btn bg-violet-500 text-black font-bold w-full mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
        </div>
    );
};

export default CheckOutForm;