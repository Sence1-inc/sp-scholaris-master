import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

import viewSvg from '../../public/images/view.svg'

import "./SearchResultsPage.css";

export default function SearchResultsPage() {
  return (
    <>
      <Header />
      <section className="search-results">
        <div className="container-1040">
          <h3>Search Result</h3>
          <div className="search__input-container">
            <div className="search__input-group">
              <Input placeholder="Search Keywords" />
              <Button>Search</Button>
            </div>
            <Filter />
          </div>
          <div className="search__results-container">
            <div className="search__results-header">
              <p>Scholarship Details</p>
              <p>Application Start Date</p>
              <p>Application Due Date</p>
              <p>Provider</p>
              <p>Actions</p>
            </div>
            <ul>
              <li className="search__results-content">
                <p className="search__results-item">
                  Tulong Dunong Scholarship 
                </p>
                <p className="search__results-item">
                  01/20/2024
                </p>
                <p className="search__results-item">
                  01/20/2025
                </p>
                <p className="search__results-item">
                  CHED
                </p>
                  <Link to={"/"} className="seach__results-link">
                    View 
                    <img src={viewSvg} alt="View icon" />
                  </Link>
              </li>
            </ul>
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
