import React from 'react';

function LeftSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}) {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col p-5'>
                    <img src={imageURL} alt={productName} />
                </div>
                <div className='col p-5'>
                    <h1 className='fs-3 mt-4 mb-4'>{productName}</h1>
                    <p style={{lineHeight:'1.8rem'}}>
                        {productDescription}
                    </p>
                    <a className='fw-medium' href={tryDemo} style={{textDecoration:"none"}}>Try Demo<i class="fa-solid fa-arrow-right"></i></a>
                    <a className='fw-medium mx-5' href={learnMore} style={{textDecoration:"none"}}>Learn more<i class="fa-solid fa-arrow-right"></i></a> 
                    <br/>
                    <a href={googlePlay}>
                    <img className='mt-4' src='/media/images/googlePlayBadge.svg' alt='Get it on Google Play'/>
                    </a>
                    <a href={appStore} className='mx-3'>
                    <img className='mt-4' src='/media/images/appstoreBadge.svg' alt='Download on the App Store'/>
                    </a>
                </div>
            </div>

        </div>
    );
}

export default LeftSection;