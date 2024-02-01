import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import {format} from 'date-fns';
import viewSvg from '../../public/images/view.svg'

import "./SearchResultsPage.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { Scholarship } from "../../redux/types";
import Search from "../../components/Search/Search";

interface Results {
  scholarships: Scholarship[]
}

export default function SearchResultsPage() {
  const result = useAppSelector((state) => state.scholarships) as Results
  const [scholarships, setScholarships] = useState<Scholarship[]>()

  useEffect(() => {
    setScholarships(result.scholarships);
  }, [result.scholarships]);

  return (
    <>
      <Header />
      <section className="search-results">
        <div className="container-1040">
          <h3>Search Result</h3>
          <Search withHeader={false} />
          <div className="search__results-container">
            <div className="search__results-header">
              <p>Scholarship Details</p>
              <p>Application Start Date</p>
              <p>Application Due Date</p>
              <p>Provider</p>
              <p>Actions</p>
            </div>
            {scholarships && scholarships.map((scholarship, index) => {
              return (
                <ul key={index}>
                  <li className="search__results-content">
                    <p className="search__results-item">
                      {scholarship.scholarship_name}
                    </p>
                    <p className="search__results-item">
                      {format(new Date(scholarship.start_date), 'MMM dd, yyyy')}
                    </p>
                    <p className="search__results-item">
                      {format(new Date(scholarship.due_date), 'MMM dd, yyyy')}
                    </p>
                    <p className="search__results-item">
                      {scholarship.scholarship_provider.provider_name}
                    </p>
                      <Link to={"/"} className="seach__results-link">
                        View 
                        <img src={viewSvg} alt="View icon" />
                      </Link>
                  </li>
                </ul>
              )
            })}
            
          </div>
          <div className="search__results-pagination">
            <p>
              Results: <span></span>
            </p>
            <p className="disabled">Previous</p>
            <p>
              Page: <span></span>
            </p>
            <p>Next</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
