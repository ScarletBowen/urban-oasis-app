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

  return (
    <footer style={footerStyle}>
      <div>
        <h1 style={headingStyle}>Made With 💚 By Team Wellbeing</h1>
        <Link to="https://github.com/ScarletBowen/urban-oasis-app" 
        className="px-6 py-2 text-bg text-gray-700 dark:text-gray-200 hover:text-indigo-500
        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 first-letter
        ">
          Our GitHub Repo
        </Link>
      </div>
    </footer>
  );
};

export default Footer;