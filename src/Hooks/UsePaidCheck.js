import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UsePaidCheck = (productId) => {

    const { data: isPaid, isLoading: paidLoading, refetch: paidRefetch } = useQuery({
        queryKey: ['paidproducts', productId],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/paidproducts?productId=${productId}`)
            .then(res => res.json())
    });

    return { isPaid, paidLoading, paidRefetch }
};

export default UsePaidCheck;