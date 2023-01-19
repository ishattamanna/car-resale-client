import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {

    const { categoryNAme, image, _id } = category;

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/categoryProducts/${_id}`)} className="card glass bg-violet-400 hover:text-white cursor-pointer">
            <figure><img src={image} className='w-full h-[250px]' alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title text-black text-3xl font-bold shadow-lg">{categoryNAme}</h2>
            </div>
        </div>
    );
};

export default CategoryCard;