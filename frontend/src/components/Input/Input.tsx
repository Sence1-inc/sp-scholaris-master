import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import './Input.css';

interface InputProps {
  placeholder: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ placeholder, handleChange }) => {
  const params = useAppSelector(state => state.searchParams)
  const [value, setValue] = useState<string>()

  useEffect(() => {
    setValue(params.params.name ? params.params.name as string : "")
  }, [params.params.name])

  return (
    <input value={value} className="search-input" type="text" placeholder={placeholder} onChange={handleChange} />
  );
};

export default Input;
