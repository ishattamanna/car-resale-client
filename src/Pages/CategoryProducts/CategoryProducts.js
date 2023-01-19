import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import Loader from '../../CustomComponents/Loader';
import BookNowModal from './ProductCard/BookNowModal/BookNowModal';
import ProductCard from './ProductCard/ProductCard';

const CategoryProducts = () => {

    const [bookingProduct, setBookingProduct] = useState(null);

    const { user } = useContext(AuthContext)

    const id = useParams().id;
    console.log(id);
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['categoryProducts', id],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/categoryProducts/${id}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('resale token')}`
            }
        })
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loader></Loader>
    }

    const handleReport = (product) => {
        const reportingProduct = {
            productId: product._id,
            carName: product.carName,
            location: product.location,
            resalePrice: product.resalePrice,
            originalPrice: product.originalPrice,
            yearOfUse: product.yearOfUse,
            postedTime: product.postedTime,
            sellerName: product.sellerName,
            sellerEmail: product.sellerEmail,
            isVerified: product.isVerified,
            picture: product.picture,
            reporterName: user.displayName,
            reporterEmail: user.email
        };

        confirmAlert({
            title: 'Confirm to Report',
            message: 'Are you sure? You want to report this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://resaledotcom-server.vercel.app/report`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `bearer ${localStorage.getItem('resale token')}`
                            },
                            body: JSON.stringify(reportingProduct)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                if (data.acknowledged) {
                                    toast.success('Product reported successfully');
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
        <div className='my-10 lg:w-[90%] px-[10px] lg:px-0 lg:mx-auto'>
            <p className='text-5xl font-bold mb-5 bg-gray-500 rounded-lg p-5'>{products[0].categoryName}</p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                        setBookingProduct={setBookingProduct}
                        handleReport={handleReport}
                    ></ProductCard>)
                }
            </div>
            {
                bookingProduct &&
                <BookNowModal
                    bookingProduct={bookingProduct}
                    setBookingProduct={setBookingProduct}
                ></BookNowModal>
            }
        </div>
    );
};

export default CategoryProducts;