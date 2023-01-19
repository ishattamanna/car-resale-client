import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../CustomComponents/Loader';
import CategoryCard from './CategoryCard/CategoryCard';

const ProductCategories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://resaledotcom-server.vercel.app/categories')
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='mt-10'>
            <p className='text-5xl font-bold text-start mb-5 text-white'>Categories</p>
            <div className='grid lg:grid-cols-4 grid-cols-1 gap-5'>
                {
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    ></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;