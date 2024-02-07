import React, { useEffect } from 'react';
import Filter from '../Filter/Filter';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Search.css';
import useGetScholarships from '../../hooks/useGetScholarships';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initializeParams } from '../../redux/reducers/SearchParamsReducer';
import Table from '../Table/Table';
import { Scholarship } from '../../redux/types';

interface SearchProps {
  withHeader: boolean;
}

interface Scholarships {
  scholarship: Scholarship[]
}

const Search: React.FC<SearchProps> = ({withHeader}) => {
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.searchParams)
  const scholarships = useAppSelector(state => state.scholarships)
  const { getScholarships } = useGetScholarships();

  const data: any = scholarships
  
  useEffect(() => {
    getScholarships(false)
  }, [])

  const handleSearch:  (e: React.MouseEvent<HTMLButtonElement>) => void  = async (e) => {
    e.preventDefault()
    getScholarships()
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
          <Button handleClick={(e) => handleSearch(e)}>Search</Button>
        </div>
        <Filter/>
        <Table hasPagination={false} scholarships={data.scholarships as Scholarship[]} />
      </div>) : (
        <div className="search__input-container">
          <div className="search__input-group">
            <Input handleChange={(e) => handleChange(e.target.value)} placeholder="Search Scholarship Name" />
            <Button handleClick={(e) => handleSearch(e)}>Search</Button>
          </div>
          <Filter/>
        </div>
      )}
    </section>
  );
};

export default Search;
