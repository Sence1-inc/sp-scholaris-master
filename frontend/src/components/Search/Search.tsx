import React, { useEffect } from 'react';
import Filter from '../Filter/Filter';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Search.css';
import useGetScholarships from '../../hooks/useGetScholarships';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initializeParams } from '../../redux/reducers/SearchParamsReducer';

interface SearchProps {
  withHeader: boolean;
}

const Search: React.FC<SearchProps> = ({withHeader}) => {
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.searchParams);
  const { getScholarships } = useGetScholarships();

  const handleSearch:  (e: React.MouseEvent<HTMLButtonElement>, isRedirected: boolean) => void  = async (e, isRedirected) => {
    e.preventDefault()
    getScholarships(isRedirected)
  }

  const handleChange  = async (value: string) => {
    dispatch(initializeParams({...params.params, "name": value}))
  }

  return (
    <section className="search">
      { withHeader ? (<div className="container-1040">
        <div className="section-header">
          <h3 className='color-secondary'>Scholaris</h3>
          <h2>Step into a world of opportunities</h2>
        </div>
        <div className="section__search-input">
          <Input handleChange={(e) => handleChange(e.target.value)} placeholder='Search Scholarship Name'/>
          <Button handleClick={(e) => handleSearch(e, true)}>Search</Button>
        </div>
        <Filter/>
      </div>) : (
        <div className="search__input-container">
          <div className="search__input-group">
            <Input handleChange={(e) => handleChange(e.target.value)} placeholder="Search Scholarship Name" />
            <Button handleClick={(e) => handleSearch(e, false)}>Search</Button>
          </div>
          <Filter/>
        </div>
      )}
    </section>
  );
};

export default Search;
