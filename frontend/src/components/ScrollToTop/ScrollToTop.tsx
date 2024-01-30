import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface LocationTypes {
  pathname: string
}
  
const ScrollToTop: React.FC = () => {
  const location = useLocation() as LocationTypes;

  // Fix the issue with React Router DOM Transition to Middle Page
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default ScrollToTop;