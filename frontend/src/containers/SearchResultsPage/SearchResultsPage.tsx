import { Typography, useTheme } from '@mui/material'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Search from '../../components/Search/Search'
import Table from '../../components/Table/Table'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import './SearchResultsPage.css'

interface SearchResultsPageProps {
  isASection: boolean
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  isASection,
}) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getScholarships } = useGetScholarships()
  const [searchParams] = useSearchParams()
  const course = searchParams.get('course')
  const school = searchParams.get('school')
  const provider = searchParams.get('provider')
  const benefits = searchParams.get('benefits')
  const start_date = searchParams.get('start_date')
  const due_date = searchParams.get('due_date')
  const location = searchParams.get('location')
  const name = searchParams.get('name')
  const result: any = useAppSelector(
    (state) => state.persistedReducer.scholarships
  )
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [page, setPage] = useState<number>(1)
  const params = useAppSelector((state) => state.searchParams)

  useEffect(() => {
    setScholarships(result.scholarships.scholarships)
  }, [result.scholarships.scholarships])

  useEffect(() => {
    if ((params?.params?.page as number) > 0) {
      getScholarships()
    }
    // eslint-disable-next-line
  }, [params.params?.page])

  useEffect(() => {
    if ((params?.params?.page as number) > result?.scholarships?.total_pages) {
      setPage(result.scholarships.total_pages)
      dispatch(
        initializeParams({
          ...params.params,
          page: result.scholarships.total_pages,
        })
      )
    }
    // eslint-disable-next-line
  }, [params.params.page, result.scholarships.total_pages])

  const handleNext = () => {
    if (scholarships.length === 10) {
      setPage(page + 1)
      dispatch(initializeParams({ ...params.params, page: page + 1 }))
    }
  }

  const handlePrevious = () => {
    if (page >= 2) {
      setPage((prevPage) => prevPage - 1)
      dispatch(initializeParams({ ...params.params, page: page - 1 }))
    }
  }

  useEffect(() => {
    const initialData = {
      params: {
        ...params.params,
        ...(course && { course: course }),
        ...(school && { school: school }),
        ...(benefits && { benefits: benefits }),
        ...(location && { location: location }),
        ...(start_date && { start_date: start_date }),
        ...(due_date && { due_date: due_date }),
        ...(provider && { provider: provider }),
        ...(name && { name: name }),
      },
    }

    dispatch(initializeParams(initialData.params))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, school, benefits, location, start_date, due_date, provider, name])

  useEffect(() => {
    const queryParams = queryString.stringify(params.params)
    navigate(`/scholarships?${queryParams}`)
    // eslint-disable-next-line
  }, [params.params])

  return (
    <section className="search-results">
      <div className="container-1040">
        <Breadcrumbs />
        <Typography variant="h3">Search Results</Typography>
        <Search isSection={false} />
        {window.innerWidth > theme.breakpoints.values.md ? (
          <Table
            total_count={result.scholarships.total_count}
            total_pages={result.scholarships.total_pages}
            page={page}
            hasPagination={true}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            scholarships={result.scholarships.scholarships}
          />
        ) : (
          <Typography sx={{ textAlign: 'center' }}>
            You can see the results on a larger display or switch to landscape
            mode for better viewing.
          </Typography>
        )}
      </div>
    </section>
  )
}
