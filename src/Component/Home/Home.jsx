import React, { Suspense, useEffect, useState } from 'react';
import LatestProduct from '../LatestProduct/LatestProduct';


const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/latest-product')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);
    return (
        <div className=''>
            <h3>this is home</h3>
          <Suspense fallback={<p>loading......</p>}>
              <LatestProduct products={products}></LatestProduct>
          </Suspense>
          
       
        </div>
    );
};

export default Home;