import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProductCard = ({ product }) => {
  const authenticated = isAuthenticated();
  
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img 
          src={product.image || "https://via.placeholder.com/300x200?text=Product+Image"} 
          className="card-img-top" 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image+Available"
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-primary fw-bold">${product.price.toFixed(2)}</p>
          <p className="card-text text-truncate flex-grow-1">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-primary">
              View Details
            </Link>
            {authenticated && (
              <Link to={`/product/edit/${product.id}`} className="btn btn-sm btn-outline-secondary">
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;