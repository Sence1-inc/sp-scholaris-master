// Import React at the beginning of your file
import React from 'react';

import './Button.css'

// Define the Button component with TypeScript types
interface ButtonProps {
  children: React.ReactNode;
}

// Use React.FC (Functional Component) type and provide the type for props
const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className='btn'>
      {children}
    </button>
  );
};

export default Button;
