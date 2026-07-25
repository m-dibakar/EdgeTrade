import React from 'react';

function Pricing() {
    return ( 
        <div className='container p-5 mt-5'>
            <div className='row p-5'>
                <div className='col'>
                    <h1 className='fs-2'>Unbeatable pricing</h1>
                    <p className='text-muted'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a className='fw-medium' href='/' style={{textDecoration:"none"}}>See pricing<i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className='col'>
                    <div className='row'>
                        <div className='col'>
                            <img src='/media/images/pricing-eq.svg' alt='Equity delivery pricing'/>
                        </div>
                        <div className='col'>
                            <img src='/media/images/pricing-eq.svg' alt='Mutual fund pricing'/>
                        </div>
                        <div className='col'>
                            <img src='/media/images/other-trades.svg' alt='Other trades pricing'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;