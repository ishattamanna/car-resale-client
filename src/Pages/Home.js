import React from 'react';
import AdvertiseSection from './AdvertiseSection/AdvertiseSection';
import Carousel from './Carousel/Carousel';
import IntroCard from './IntroCard/IntroCard';
import ProductCategories from './ProductCategories/ProductCategories';

const Home = () => {
    return (
        <div className='lg:w-[90%] px-[10px] lg:px-0 lg:mx-auto'>
            <Carousel></Carousel>
            <ProductCategories></ProductCategories>
            <AdvertiseSection></AdvertiseSection>
            <IntroCard></IntroCard>
        </div>
    );
};

export default Home;