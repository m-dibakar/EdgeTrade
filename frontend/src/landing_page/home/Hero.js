import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='container p-5'>
            <div className='row text-center'>
                <img src='/media/images/landing.svg' alt='Hero' className='mb-5'/>
                <h1 className='mt-5'>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <div>
                    <Link to='/signup' className='mt-2 p-2 btn btn-primary fs-5' style={{minWidth:"200px"}}>Sign up for free</Link>
                </div>
            </div>

        </div>
    );
}

export default Hero;