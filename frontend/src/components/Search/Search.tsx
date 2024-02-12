import React, { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Search.css';
import useGetScholarships from '../../hooks/useGetScholarships';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { initializeParams } from '../../redux/reducers/SearchParamsReducer';
import Table from '../Table/Table';
import { Scholarship } from '../../redux/types';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';


interface SearchProps {
  isSection: boolean;
}

const Search: React.FC<SearchProps> = ({isSection}) => {
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.searchParams)
  const navigate = useNavigate();
  const scholarships = useAppSelector(state => state.scholarships)
  const { getScholarships } = useGetScholarships();
  const [name, setName] = useState<string>(params.params.name as string)

  const data: any = scholarships
  
  useEffect(() => {
    if (isSection) {
      getScholarships(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSection])

  const handleSearch:  (e: React.MouseEvent<HTMLButtonElement>) => void  = async (e) => {
    e.preventDefault()
    dispatch(initializeParams({...params.params, name}))
  }

  const handleChange  = async (value: string) => {
    setName(value)
  }

  useEffect(() => {
    if (!params.params.name) {
      setName("")
    }

    if (Object.keys(params.params).length > 0) {
      const queryParams = queryString.stringify(params.params)
      navigate(`/scholarships?${queryParams}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.params])

  return (
    <section className="search">
      { isSection ? (<div className="container-1040">
        <div className="section-header">
          <h3 className='color-secondary'>Scholaris</h3>
          <h2>Step into a world of opportunities</h2>
        </div>
        <div className="section__search-input">
          <Input handleChange={(e) => handleChange(e.target.value)} value={name} placeholder='Search Scholarship Name'/>
          <Button handleClick={(e) => handleSearch(e)}>Search</Button>
        </div>
        <Filter/>
        <Table hasPagination={false} scholarships={data.scholarships as Scholarship[]} />
      </div>) : (
        <div className="search__input-container">
          <div className="search__input-group">
            <Input handleChange={(e) => handleChange(e.target.value)} value={name} placeholder="Search Scholarship Name" />
            <Button handleClick={(e) => handleSearch(e)}>Search</Button>
          </div>
          <Filter/>
        </div>
      )}
    </section>
  );
};

export default Search;
