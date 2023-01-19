import React from 'react';

const Carousel = () => {
    return (
        <div className="carousel w-full mt-5 rounded-lg">
            <div id="slide1" className="carousel-item relative w-full">
                <img alt='' src="https://www.bugatti.com/fileadmin/_processed_/sei/p1/se-image-3bbeac5006e9b894545a3519cc23a735.jpg" className="w-full lg:h-[500px]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle bg-red-900">❮</a>
                    <a href="#slide2" className="btn btn-circle bg-red-900">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img alt='' src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Jaguar/F-TYPE/7810/1643799635985/front-left-side-47.jpg?impolicy=resize&imwidth=480" className="w-full lg:h-[500px]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle bg-red-900">❮</a>
                    <a href="#slide3" className="btn btn-circle bg-red-900">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img alt='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYTP3Bcv66P9pdppm_EXwGpcuLixCUM9Ghw&usqp=CAU" className="w-full lg:h-[500px]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle bg-red-900">❮</a>
                    <a href="#slide4" className="btn btn-circle bg-red-900">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img alt='' src="https://www.motortrend.com/uploads/2022/03/2022-Honda-Civic-Touring-vs-2022-Hyundai-Elantra-Limited-vs-2022-Kia-Forte-GT-vs-2022-Mazda-Mazda3-Sedan-AWD-Turbo-vs-2022-Nissan-Sentra-SR-vs-2022-Volkswagen-Jetta-SEL-19.jpg" className="w-full lg:h-[500px]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle bg-red-900">❮</a>
                    <a href="#slide1" className="btn btn-circle bg-red-900">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Carousel;