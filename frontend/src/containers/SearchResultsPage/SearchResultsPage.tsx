import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import SearchInput from "../../components/SearchInput/SearchInput";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

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
              <SearchInput placeholder="Search Keywords" />
              <Button>Search</Button>
            </div>
            <Filter />
          </div>
          <div className="search__results-container">
            <div className="search__results-header">
              <h4>Scholarship Details</h4>
              <p>Actions</p>
            </div>
            <ul>
              <li className="search__results-content">
                <p className="search__results-item">
                  Tulong Dunong Scholarship <span>Ched Scholarship</span>{" "}
                </p>
                <div>
                  <Link to={"/"} className="seach__results-link">
                    View
                  </Link>
                </div>
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
