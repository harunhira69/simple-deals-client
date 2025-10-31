import React from 'react';
import { Link } from 'react-router';

const Products = ({pro}) => {
    const {_id,title,price_min,price_max,image} =pro;
    return (
<div className="card bg-base-100 shadow-sm">
  <figure className="p-0">
    <img src={image} alt={title} className="rounded-xl" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>Price:${price_min}-{price_max}</p>
    <div className="card-actions">
      <Link to={`/product-details/${_id}`} className="btn btn-primary w-full">View Details</Link>
    </div>
  </div>
</div>

    );
};

export default Products;