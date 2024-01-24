import React from 'react';
import Filter from '../../Filter/Filter';
import Button from '../../Button/Button';
import SearchInput from '../../SearchInput/SearchInput';

import './Search.css';

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <section className="search">
      <div className="container-1040">
      <div className="section-header">
        <h3 className='color-secondary'>Scholaris</h3>
        <h2>Step into a world of opportunities</h2>
      </div>
      <div className="section__search-input">
        <SearchInput placeholder='Search Keywords'/>
        <Button>Search</Button>
      </div>
      <Filter />
      </div>
    </section>
  );
};

export default Search;
