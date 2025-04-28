import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById, deleteProduct } from '../utils/api';
import { isAuthenticated, getToken } from '../utils/auth';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const authenticated = isAuthenticated();
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleDelete = async () => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteProduct(id, getToken());
      navigate('/');
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      setDeleteLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Product not found.
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-start"
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/600x400?text=No+Image+Available"
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body p-4">
              <h1 className="card-title mb-3">{product.name}</h1>
              <h3 className="text-primary mb-4">${product.price.toFixed(2)}</h3>
              
              <div className="mb-4">
                <h5>Description</h5>
                <p className="card-text">{product.description}</p>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Quantity</label>
                <div className="input-group" style={{ width: '150px' }}>
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <input 
                    type="number" 
                    className="form-control text-center" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</button>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary" 
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart
                </button>
              </div>
              
              <div className="d-flex gap-2 mt-4">
                <Link to="/" className="btn btn-outline-secondary">
                  Back to Products
                </Link>
                
                {authenticated && (
                  <>
                    <Link to={`/product/edit/${id}`} className="btn btn-outline-primary">
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="btn btn-outline-danger"
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;