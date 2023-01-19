import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const AddProducts = () => {

    const imageBBSecret = process.env.REACT_APP_image_bb_secret;

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const carName = form.carName.value;
        const originalPrice = form.originalPrice.value;
        const resalePrice = form.resalePrice.value;
        const productCondition = form.productCondition.value;
        const yearOfUse = form.yearOfUse.value;
        const location = form.location.value;
        const categoryName = form.categoryName.value.split('  ')[1];
        const categoryId = form.categoryName.value.split('  ')[0];
        const sellerName = user?.displayName;
        const sellerEmail = user?.email;

        const image = form.image.files[0];

        const formData = new FormData();

        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${imageBBSecret}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData.data.url);
                const picture = imageData.data.url;
                const productInfo = {
                    carName,
                    originalPrice,
                    resalePrice,
                    productCondition,
                    yearOfUse,
                    location,
                    categoryId,
                    picture,
                    categoryName,
                    sellerName,
                    sellerEmail
                };

                fetch(`https://resaledotcom-server.vercel.app/addproduct`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('resale token')}`
                    },
                    body: JSON.stringify(productInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.acknowledged) {
                            toast.success('Product inserted successfully');
                            navigate('/dashboard/myproducts');
                        }
                    })
            })


    }

    return (
        <div className='w-full mt-10'>
            <p className='text-5xl my-5 font-bold text-start text-white ml-5'>Add Products</p>
            <section data-theme="synthwave" className="p-6 text-gray-100">
                <div className="w-full px-6 rounded-md sm:px-12 md:px-16 xl:col-span-2">
                    <span className="block mb-2 text-violet-400">Add your own product</span>
                    <h1 className="lg:text-5xl text-3xl font-extrabold text-gray-50">Please fill-up with necessary Information</h1>
                    <form onSubmit={handleSubmit} className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid mt-5">
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-full'>
                            <div className='w-full'>
                                <div className='text-start mt-5'>
                                    <label className="text-start my-2 font-bold">Car Name</label>
                                    <input name='carName' id="name" type="text" placeholder="Car Name" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2" />
                                </div>
                                <div className='text-start mt-5'>
                                    <label className="text-start my-2 font-bold">Original Price</label>
                                    <input name='originalPrice' id="lastname" type="number" placeholder="Original Price" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2" />
                                </div>
                                <div className='text-start mt-5'>
                                    <label className="text-start my-2 font-bold">Resale Price</label>
                                    <input name='resalePrice' id="lastname" type="number" placeholder="Resale Price" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2" />
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className="form-control w-full">
                                    <label className="text-start my-2 font-bold">Product Condition</label>
                                    <select name='productCondition' className="select select-bordered">
                                        <option>Excelent</option>
                                        <option>Good</option>
                                        <option>Fair</option>
                                    </select>
                                </div>
                                <div className='text-start mt-5'>
                                    <label className="text-start my-2 font-bold">Location</label>
                                    <input name='location' id="lastname" type="text" placeholder="location" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2" />
                                </div>
                                <div className='text-start mt-5'>
                                    <label className="text-start my-2 font-bold">Year of use</label>
                                    <input name='yearOfUse' id="lastname" type="number" placeholder="Year of use" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 p-2 mt-2" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="text-start my-2 font-bold">Car Category</label>
                                    <select name='categoryName' className="select select-bordered">
                                        <option value={'637f005843fb22f0f9df4933  Family Car'}>Family Car</option>
                                        <option value={'637f005843fb22f0f9df4936  Micro Bus'}>Micro Bus</option>
                                        <option value={'637f005843fb22f0f9df4934  Fancy Car'}>Fancy Car</option>
                                        <option value={'637f005843fb22f0f9df4935  Truck'}>Truck</option>
                                    </select>
                                </div>
                            </div>
                            <div className='text-start mt-5 w-full'>
                                <label className="text-start my-2 font-bold">Upload Car Image</label>
                                <input name='image' type="file" className="file-input file-input-bordered w-full" />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-2 font-semibold rounded bg-violet-400 text-gray-900">Add Product</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddProducts;