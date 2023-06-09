import React from 'react';
import { FooterLink, Heading } from './FooterStyles';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <Heading>Donate</Heading>
      <FooterLink as={Link} to="/donationPage">
        Make a Donation
      </FooterLink>
    </div>
  );
};

export default Footer;