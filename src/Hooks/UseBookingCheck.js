import { useQuery } from '@tanstack/react-query';

const UseBookingCheck = (productId) => {

    const { data: isOrdered, refetch: bookingCheckRefetch, isLoading: bookingCheckLoading } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/products/${productId}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('resale token')}`
            }
        })
            .then(res => res.json())
    });
    return { isOrdered, bookingCheckRefetch, bookingCheckLoading }

};

export default UseBookingCheck;