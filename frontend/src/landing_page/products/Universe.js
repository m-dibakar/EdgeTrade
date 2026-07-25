import React from 'react';

function Universe() {
    return (
        <div className='container text-center'>
            <h1 className='fs-5 mb-5 p-5 text-muted'>Want to know more about our technology stack? Check out the <a className='fw-medium' href='/' style={{ textDecoration: "none" }}>Zerodha.tech</a> blog.</h1>
            <div className='row mt-5'>
                <h1 className='fs-3 mb-4'>The Zerodha Universe</h1>
                <p>Extend your trading and investment experience even further with our partner platforms</p>
            </div>
            <div className='row p-5'>
                <div className='col'>
                    <a href='https://www.zerodhafundhouse.com/' style={{ textDecoration: 'none' }}>
                        <img className='mb-2' src='/media/images/zerodhaFundhouse.png' style={{ width: '50%' }} alt='Zerodha Fund House' />
                        <p style={{ fontSize: '13px', lineHeight: '1.3rem', color: 'gray' }}>Our asset management venture <br />
                            that is creating simple and transparent index <br />
                            funds to help you save for your goals.
                        </p>
                    </a>
                </div>
                <div className='col'>
                    <a href='https://sensibull.com/' style={{ textDecoration: 'none' }}>
                        <img className='mb-4' src='/media/images/sensibullLogo.svg' style={{ width: '60%' }} alt='Sensibull' />
                        <p style={{ fontSize: '13px', lineHeight: '1.3rem', color: 'gray' }}>Options trading platform that lets you <br />
                            create strategies, analyze positions, and examine<br />
                            data points like open interest, FII/DII, and more.
                        </p>
                    </a>
                </div>
                <div className='col'>
                    <a href='https://www.tijorifinance.com/' style={{ textDecoration: 'none' }}>
                        <img className='mb-2' src='/media/images/tijori.svg' style={{ width: '40%' }} alt='Tijori Finance' />
                        <p style={{ fontSize: '13px', lineHeight: '1.3rem', color: 'gray' }}>Investment research platform <br />
                            that offers detailed insights on stocks, <br />
                            sectors, supply chains, and more.
                        </p>
                    </a>
                </div>
            </div>
            <div className='row p-5'>
                <div className='col'>
                    <a href='https://www.streak.tech/' style={{ textDecoration: 'none' }}>
                        <img className='mb-2' src='/media/images/streakLogo.png' style={{ width: '50%' }} alt='Streak' />
                        <p style={{ fontSize: '13px', lineHeight: '1.3rem', color: 'gray' }}>Systematic trading platform <br/>
                            that allows you to create and backtest <br/>
                            strategies without coding.
                        </p>
                    </a>
                </div>
                <div className='col'>
                    <a href='https://smallcase.zerodha.com/' style={{ textDecoration: 'none' }}>
                        <img className='mb-2' src='/media/images/smallcaseLogo.png' style={{ width: '60%' }} alt='smallcase' />
                        <p style={{ fontSize: '13px', lineHeight: '1.3rem', color: 'gray' }}>Thematic investing platform <br />
                            that helps you invest in diversified<br />
                            baskets of stocks on ETFs.
                        </p>
                    </a>
                </div>
                <div className='col'>
                    <a href='https://joinditto.in/' style={{ textDecoration: 'none' }}>
                        <img className='mb-3' src='/media/images/dittoLogo.png' style={{ width: '40%' }} alt='Ditto Insurance' />
                        <p style={{ fontSize: '13px', lineHeight: '1.3rem', color: 'gray' }}>Personalized advice on life <br />
                            and health insurance. No spam <br />
                            and no mis-selling.
                        </p>
                    </a>
                </div>
            </div>
            <button className='mt-2 p-2 btn btn-primary fs-5 fw-medium' style={{width:"15%", margin:"0 auto"}}>Sign up for free</button>
        </div>
    );
}

export default Universe;