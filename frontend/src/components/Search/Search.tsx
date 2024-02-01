import React from 'react';
import Filter from '../Filter/Filter';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Search.css';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../axiosConfig'
import { Scholarship } from '../../redux/types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initializeScholarships } from '../../redux/reducers/ScholarshipsReducer';
import { useNavigate } from 'react-router-dom';

interface ErrorResponse {
  error: string;
  details: string[];
}

interface SearchProps {
  withHeader: boolean
}

const Search: React.FC<SearchProps> = ({withHeader}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useAppSelector((state) => state.searchParams)
  const handleSearch:  (e: React.MouseEvent<HTMLButtonElement>) => void  = async (e) => {
    e.preventDefault()

    try {
      const response: AxiosResponse<Scholarship[] | ErrorResponse> = await axiosInstance.get(
        `api/v1/scholarships`, params)

      if (response.status == 200) {
        dispatch(initializeScholarships(response.data as Scholarship[]))
        navigate("/search-result")
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <section className="search">
      { withHeader ? (<div className="container-1040">
        <div className="section-header">
          <h3 className='color-secondary'>Scholaris</h3>
          <h2>Step into a world of opportunities</h2>
        </div>
        <div className="section__search-input">
          <Input placeholder='Search Keywords'/>
          <Button handleClick={handleSearch}>Search</Button>
        </div>
        <Filter  />
      </div>) : (
        <div className="search__input-container">
          <div className="search__input-group">
            <Input placeholder="Search Keywords" />
            <Button handleClick={handleSearch}>Search</Button>
          </div>
          <Filter />
        </div>
      )}
    </section>
  );
};

export default Search;
