import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        {/* Error 404 Code */}
        <div className="error-code">
          <h1>404</h1>
          <div className="error-shape">
            <span>😕</span>
          </div>
        </div>

        {/* Error Message */}
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={() => navigate(-1)} className="btn-back">
            ← Go Back
          </button>
          
          <Link to="/" className="btn-home">
            🏠 Home Page
          </Link>
        </div>

        {/* Helpful Links (optional) */}
        <div className="helpful-links">
          <h4>You might be looking for:</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;