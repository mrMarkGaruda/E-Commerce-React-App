import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logoutUser } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="py-3 mb-4 border-bottom">
      <div className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
        <Link to="/" className="d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none">
          <h3 className="m-0">E-commerce</h3>
        </Link>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-dark">
              Home
            </Link>
          </li>
          {authenticated && (
            <li>
              <Link to="/product/new" className="nav-link px-2 link-dark">
                Add Product
              </Link>
            </li>
          )}
        </ul>

        <div className="col-md-3 text-end">
          {authenticated ? (
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-outline-dark me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/signup">
                Sign-up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;