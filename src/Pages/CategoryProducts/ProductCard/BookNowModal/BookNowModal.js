import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import UseBookingCheck from '../../../../Hooks/UseBookingCheck';

const BookNowModal = ({ bookingProduct, setBookingProduct }) => {

    const { user } = useContext(AuthContext);
    const {
        _id,
        carName,
        resalePrice,
        picture
    } = bookingProduct;

    const { bookingCheckRefetch } = UseBookingCheck(_id)

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const clientName = form.name.value;
        const clientEmail = form.email.value;
        const productName = form.productName.value;
        const price = form.price.value;
        const phoneNumber = form.phoneNumber.value;
        const meetingLocation = form.meetingLocation.value;
        const productId = _id;

        const bookingInfo = {
            clientName,
            clientEmail,
            productName,
            price,
            phoneNumber,
            meetingLocation,
            picture,
            productId
        };

        fetch('https://resaledotcom-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('resale token')}`
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Your order has been confirmed');
                    setBookingProduct(null);
                    bookingCheckRefetch();
                }
            })
    }


    return (
        <div>
            <input type="checkbox" id="bookNowModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => setBookingProduct(null)} htmlFor="bookNowModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Please fill up with necessary Info</h3>
                    <form onSubmit={handleSubmit} className='mt-5'>
                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name='name' type="text" readOnly defaultValue={user?.displayName} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" readOnly defaultValue={user?.email} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input name='productName' type="text" readOnly defaultValue={carName} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input name='price' type="text" readOnly defaultValue={resalePrice} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input name='phoneNumber' type="text" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Meeting Location</span>
                            </label>
                            <input name='meetingLocation' type="text" className="input input-bordered w-full" />
                        </div>
                        <button className='btn btn-secondary w-full mt-4 bg-violet-500' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookNowModal;