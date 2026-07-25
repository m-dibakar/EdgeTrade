import React from 'react';

function RightSection({ imageURL, productName, productDescription, learnMore }) {
    return (
        <div className='container'>
            <div className='row p-5'>
                <div className='col mt-5 p-5'>
                    <h1 className='fs-3 mt-5 mb-4'>{productName}</h1>
                    <p style={{ lineHeight: '1.8rem' }}>
                        {productDescription}
                    </p>
                    <a className='fw-medium' href={learnMore} style={{ textDecoration: "none" }}>Learn more<i class="fa-solid fa-arrow-right"></i></a>

                </div>
                <div className='col'>
                    <img src={imageURL} alt={productName} />
                </div>
            </div>

        </div>
    );
}

export default RightSection;