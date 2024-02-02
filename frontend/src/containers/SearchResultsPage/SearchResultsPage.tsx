import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import viewSvg from '../../public/images/view.svg'
import "./SearchResultsPage.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Scholarship } from "../../redux/types";
import Search from "../../components/Search/Search";
import useGetScholarships from "../../hooks/useGetScholarships";
import { initializeParams } from "../../redux/reducers/SearchParamsReducer";

interface Results {
  scholarships: Scholarship[]
}

export default function SearchResultsPage() {
  const dispatch = useAppDispatch()
  const { getScholarships } = useGetScholarships()
  const result = useAppSelector((state) => state.scholarships) as Results
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [page, setPage] = useState<number>(1)
  const params = useAppSelector((state) => state.searchParams);

  useEffect(() => {
    setScholarships(result.scholarships);
  }, [result.scholarships]);

  useEffect(() => {
    getScholarships(false)
  }, [params.params]);

  const handleNext = () => {
    if (scholarships.length == 10) {
      setPage(page + 1)
      dispatch(initializeParams({ ...params.params, "page": page + 1 }))
    }
  }

  const handlePrevious = () => {
    if (page >= 2) {
      setPage(prevPage => prevPage - 1)
      dispatch(initializeParams({ ...params.params, "page": page - 1 }))
    }
  }

  useEffect(() => {
    getScholarships(false)
  }, [page])

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
            {scholarships.length > 0 ? (
              scholarships.map((scholarship, index) => (
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
              ))
            ) : (
              <ul>
                <li className="search__results-content">
                  <p className="search__results-item">No scholarship found.</p>
                </li>
              </ul>
            )}


          </div>
          <div className="search__results-pagination">
            <p>
              Results: <span>{scholarships.length}</span>
            </p>
            <p className={page === 1 ? "disabled" : ""} onClick={handlePrevious}>Previous</p>
            <p>
              Page: <span>{page}</span>
            </p>
            <p className={scholarships.length < 10 ? "disabled" : ""} onClick={handleNext}>Next</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
