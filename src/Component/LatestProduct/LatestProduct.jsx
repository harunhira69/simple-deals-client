import React from 'react';
import Products from '../Products/Products';

const LatestProduct = ({products}) => {
    
    console.log(products)

    return (
        <div>
            <h3 className='text-5xl text-center'>Recent <span className='text-primary'>Product</span></h3>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {
            products.map(pro=><Products key={pro._id} pro={pro}></Products>
                
            )
          }
        </div>
        </div>
    );
};

export default LatestProduct;