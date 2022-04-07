import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <h2>Home Page</h2>
      <Link to="/catalog">Catalog</Link>
    </>
  );
};

export default HomePage;
