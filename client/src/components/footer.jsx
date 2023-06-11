import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
    <div>
      <h1>Donate</h1>
      <p as={Link} to="/DonationPage">
        Make a Donation
      </p>
    </div>
    </footer>
  );
};

export default Footer;