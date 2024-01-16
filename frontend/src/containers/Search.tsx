import React from 'react';
import Filter from '../components/Filter/Filter';
import Button from '../components/Button/Button';
import SearchInput from '../components/SearchInput/SearchInput';

import './Search.css';

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <div className="section">
      <div className="section-header">
        <h3>Get Started</h3>
        <p>Search Your Scholarship!</p>
      </div>
      <div className="section__search-input">
        <SearchInput placeholder='Search Keyword'/>
        <Button>Search</Button>
      </div>
      <Filter />
    </div>
  );
};

export default Search;
