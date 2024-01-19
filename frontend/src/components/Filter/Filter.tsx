import React from 'react';
import './Filter.css';

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  return (
    <div className="filter">
      <div className="filter-header">
        <h3>Filters</h3>
      </div>
      <form className="filter-body">
        <div className="filter-options">
          <div className="filter__input-group">
            <input type="radio" id="date" name="filter" />
            <label htmlFor="date">Date</label>
          </div>

          <div className="filter__input-group">
            <input type="radio" id="location" name="filter" />
            <label htmlFor="location">Location</label>
          </div>

          <div className="filter__input-group">
            <input type="radio" id="benefits" name="filter" />
            <label htmlFor="benefits">Benefits</label>
          </div>

          <div className="filter__input-group">
            <input type="radio" id="course" name="filter" />
            <label htmlFor="course">Course</label>
          </div>

          <div className="filter__input-group">
            <input type="radio" id="provider" name="filter" />
            <label htmlFor="provider">School/Provider</label>
          </div>
        </div>

        <button className="filter-reset" type='reset'>Reset Filters</button>
      </form>
    </div>
  );
};

export default Filter;
