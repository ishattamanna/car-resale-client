import { useQuery } from '@tanstack/react-query';

const UseAdvertisingCheck = (productId) => {

    const { data: isAdvertised, refetch: advertisingRefetch } = useQuery({
        queryKey: ['advertisingProducts', productId],
        queryFn: () => fetch(`https://resaledotcom-server.vercel.app/advertisingProducts?productId=${productId}`)
            .then(res => res.json())
    });

    return [isAdvertised, advertisingRefetch]
};

export default UseAdvertisingCheck;