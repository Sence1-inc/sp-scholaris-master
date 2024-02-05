import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css'

const Breadcrumbs: React.FC = () => {
  return (
    <p className='container_breadcrumbs'>
      <Link to="/student">Student</Link> / <Link to="/scholarships">Scholarships</Link>
    </p>
  );
};

export default Breadcrumbs;
