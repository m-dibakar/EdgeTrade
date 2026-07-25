import React from 'react';

function Team() {
    return ( 
        <div className='container p-5'>
            <h1 className='fs-3 text-center'>People</h1>
            <div className='row p-5 mt-5'>
                <div className='col text-center'>
                    <img src='/media/images/nithinKamath.jpg' style={{borderRadius:'100%', width:'55%'}} alt='Nithin Kamath, Founder and CEO'/>
                    <h1 className='fs-5 mt-4'>Nithin Kamath</h1>
                    <p className='text-muted mt-3'>Founder, CEO</p>
                </div>
                <div className='col'>
                    <p className='p-2'>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
                    <p className='p-2'>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
                    <p className='p-2'>Playing basketball is his zen.</p>
                    <p className='p-2'>Connect on <a className='fw-medium' href='/' style={{textDecoration:'none'}}>Homepage</a> / <a className='fw-medium' href='/' style={{textDecoration:'none'}}>TradingQnA</a> / <a className='fw-medium' href='/' style={{textDecoration:'none'}}>Twitter</a></p>
                </div>
            </div>
        </div>
     );
}

export default Team;