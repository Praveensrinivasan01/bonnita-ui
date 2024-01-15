import React, { useEffect } from 'react'
import thankYou from '../Assets/ThankYou/4431304.jpg'

const ThankYou = ({ data }) => {

    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/';
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