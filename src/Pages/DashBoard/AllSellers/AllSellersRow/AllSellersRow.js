import React from 'react';

const AllSellersRow = ({ seller, decimal, handleVerificationStatus, handleDeleteSeller }) => {

    const { email, image, name, role, _id, isVerified } = seller;

    return (
        <tr>
            <th>
                <button onClick={() => handleDeleteSeller(seller)} className="btn btn-circle bg-red-700 text-black font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                {decimal + 1}
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt='' />
                        </div>
                    </div>

                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{name}</div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{email}</div>
                </div>
            </td>
            <th>
                <button onClick={() => handleVerificationStatus(seller)} className={`btn btn-xs text-black font-bold ${isVerified ? 'bg-green-500' : 'bg-red-500'}`}>{isVerified ? 'Verified' : 'Unverified'}</button>
            </th>
        </tr>
    );
};

export default AllSellersRow;