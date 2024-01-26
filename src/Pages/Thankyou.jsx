import React, { useContext, useEffect } from 'react'
import thankYou from '../Assets/ThankYou/4431304.jpg'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
const ThankYou = ({ data }) => {
    const navigate = useNavigate()
    const { fetchData, fetchDataFav } = useContext(AuthContext);
    useEffect(() => {
        fetchDataFav();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5500);
    }, [])



    return (
        <>
            <div className=''>
                <img className='img-fluid' src={thankYou} alt='img' />
            </div>
        </>
    )
}

export default ThankYou