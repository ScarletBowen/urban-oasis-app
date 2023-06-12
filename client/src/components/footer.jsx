import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f2f2f2',
    padding: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
  };

  const linkStyle = {
    color: '#666',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const linkHoverStyle = {
    color: '#000',
  };

  return (
    <footer style={footerStyle}>
      <div>
        <h1 style={headingStyle}>Support Team Oasis!</h1>
        <Link to="/" style={linkStyle} activeStyle={linkHoverStyle}>
          Make a Donation
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
