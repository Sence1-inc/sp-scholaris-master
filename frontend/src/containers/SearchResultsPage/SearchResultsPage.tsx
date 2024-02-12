import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSearchParams } from "react-router-dom";
import "./SearchResultsPage.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Params, Scholarship } from "../../redux/types";
import Search from "../../components/Search/Search";
import useGetScholarships from "../../hooks/useGetScholarships";
import { initializeParams } from "../../redux/reducers/SearchParamsReducer";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Table from "../../components/Table/Table";

interface Results {
  scholarships: Scholarship[]
}

interface SearchResultsPageProps {
  isASection: boolean;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({isASection}) => {
  const dispatch = useAppDispatch()
  const {getScholarships} = useGetScholarships()
  const [searchParams] = useSearchParams()
  const course = searchParams.get("course")
  const school = searchParams.get("school")
  const provider = searchParams.get("provider")
  const benefits = searchParams.get("benefits")
  const start_date = searchParams.get("start_date")
  const due_date = searchParams.get("due_date")
  const location = searchParams.get("location")
  const name = searchParams.get("name")
  const result = useAppSelector((state) => state.scholarships) as Results
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [page, setPage] = useState<number>(1)
  const params = useAppSelector((state) => state.searchParams);

  useEffect(() => {
    setScholarships(result.scholarships);
  }, [result.scholarships]);
  
  const handleNext = () => {
    if (scholarships.length === 10) {
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
    const keysToUpdate: Params = { course, school, benefits, location, start_date, due_date, provider, name };

    const keysToUpdateFiltered: Params = Object.entries(keysToUpdate)
      .filter(([key, value]) => !!value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    Object.entries(keysToUpdateFiltered).forEach(([key, value]) => {
      dispatch(initializeParams({ ...params.params, [key]: value }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, school, benefits, location, start_date, due_date, provider, name, dispatch]);

  useEffect(() => {
    const hasParametersInURL = searchParams.size > 0;

    if (Object.keys(params.params).some(param => params.params[param] !== undefined) || hasParametersInURL) {
      getScholarships();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, params.params])

  return (
    <>
      <Header />
      <section className="search-results">
        <div className="container-1040">
          <Breadcrumbs />
          <h3>Search Result</h3>
          <Search isSection={false} />
          <Table page={page} hasPagination={true} handleNext={handleNext} handlePrevious={handlePrevious} scholarships={scholarships} />
        </div>
      </section>
      <Footer />
    </>
  );
}
