import axios from 'axios';
import React, { useState } from 'react';

const CoupenForm = () => {
    const [coupen, setCoupen] = useState('');
    const [error, setError] = useState('');

    const [res,setRes]= useState([])
    // const [,setRes]= useState([])

    const handleCoupen = async () => {
        if (!coupen) {
            setError('Please enter a coupon code.');
            return;
        }
        try {
            const body = {
                coupon_name: coupen
            };
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/check-coupon`,
                body
            );
            setRes(response.data);
            if(response.data.statusCode===400){
                setError(response.data.message);
                setCoupen('');
            }

            console.log(response, "response");

        } catch (error) {
            // Handle error
        }
    };

    const handleInputChange = (e) => {
        setCoupen(e.target.value);
        setError('');
    };

    return (
        <div>
            <div className="bg-white rounded pt-6 flex justify-between items-center">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Coupon Code
                    </label>
                    <input
                        className="appearance-none border border-red-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="text"
                        placeholder="Please Enter the code."
                        value={coupen}
                        onChange={handleInputChange}
                    />
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleCoupen}
                >
                    Apply Now
                </button>
            </div>
                {
                    res.statusCode === 200 ? (
                        <p className="text-green-500 text-xs italic">{res.message}</p>
                    ):(
                        <p className="text-red-500 text-xs italic">{res.message}</p>
                    )
                }
        </div>
    );
};

export default CoupenForm;
