import React from 'react';

function Education() {
    return ( 
        <div className='container p-5'>
            <div className='row p-5'>
                <div className='col'>
                    <img src='/media/images/index-education.svg' alt='Market education'/>
                </div>
                <div className='col p-5'>
                    <h1 className='fs-2'>Free and open market education</h1>
                    <p className='text-muted mt-4'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a className='fw-semibold' href='/' style={{textDecoration:"none"}}>Varsity<i class="fa-solid fa-arrow-right"></i></a>
                    <p className='text-muted mt-4'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a className='fw-semibold' href='/' style={{textDecoration:"none"}}>TradingQ&A<i class="fa-solid fa-arrow-right"></i></a>
                </div>

            </div>
        </div>
     );
}

export default Education;