import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-3 bg-light mt-auto">
      <div className="container">
        <ul className="nav justify-content-center pb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link px-2">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link px-2">
              Sign-up
            </Link>
          </li>
        </ul>
        <p className="text-center text-muted">© 2025 Mark Abramenko</p>
      </div>
    </footer>
  );
};

export default Footer;