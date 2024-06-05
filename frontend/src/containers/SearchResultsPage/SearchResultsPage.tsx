import { OpenInNew } from '@mui/icons-material'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import HomeIcon from '@mui/icons-material/Home'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Cookies from 'js-cookie'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Search from '../../components/Search/Search'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import './SearchResultsPage.css'

interface GridRowDef {
  scholarshipName: string
  startDate: Date
  endDate: Date
  provider: string
}

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
  const [page, setPage] = useState<number>(0)
  const params = useAppSelector((state) => state.searchParams)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalCount, setTotalCount] = useState<number>(10)
  const [rowData, setRowData] = useState<GridRowDef[]>([])

  const columns = [
    {
      field: 'scholarshipName',
      headerName: 'Scholarship Name',
      flex: 1.5,
    },
    { field: 'startDate', headerName: 'Start Date', type: 'date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', type: 'date', flex: 1 },
    { field: 'provider', headerName: 'Organization', type: 'string', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      renderCell: (params: any) => renderActions(params),
    },
  ]

  const renderActions = (params: any) => {
    return (
      <Box>
        <Typography
          color="secondary"
          component={Link}
          to={`/scholarships/${params.row.id}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '150px',
          }}
        >
          View
          <OpenInNew fontSize="small" />
        </Typography>
      </Box>
    )
  }

  const formatScholarships = (data: Scholarship[]) => {
    const row = data.map((scholarship: Scholarship) => {
      return {
        id: scholarship.id,
        scholarshipName: scholarship.scholarship_name,
        startDate: new Date(scholarship.start_date),
        endDate: new Date(scholarship.due_date),
        provider: scholarship.scholarship_provider.provider_name,
      }
    })
    setIsLoading(false)
    setRowData(row)
  }

  const handlePageChange = (par: { page: number; pageSize: number }) => {
    setIsLoading(true)
    setPage(par.page + 1)
    setPageSize(par.pageSize)
  }

  useEffect(() => {
    if (page > 0) {
      dispatch(initializeParams({ ...params.params, page: page }))
    }
  }, [page])

  useEffect(() => {
    if (params.params.page) {
      getScholarships()
    }
  }, [params.params.page])

  useEffect(() => {
    if (
      Array.isArray(result.scholarships.scholarships) &&
      result.scholarships.scholarships.length > 0
    ) {
      formatScholarships(result.scholarships.scholarships)
      setTotalCount(result.scholarships.total_count)
    } else {
      setRowData([])
    }
  }, [result.scholarships.scholarships])

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
    dispatch(initializeParams({ ...params.params, limit: pageSize }))
  }, [pageSize])

  useEffect(() => {
    const queryParams = queryString.stringify(params.params)
    navigate(`/scholarships?${queryParams}`)
    // eslint-disable-next-line
  }, [params.params])

  return (
    <section className="search-results">
      <div className="container-1040">
        <Button
          onClick={() => {
            navigate((Cookies.get('lastVisited') as string) ?? '/')
          }}
          sx={{
            alignSelf: 'flex-start',
            color: 'secondary.main',
            fontSize: '24px',
            fontWeight: 700,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {!Cookies.get('lastVisited') ? (
            <>
              <HomeIcon />
              Main Menu
            </>
          ) : (
            <>
              <ArrowBackIos /> Back
            </>
          )}
        </Button>
        <Typography variant="h3">Search Results</Typography>
        <Search isSection={false} />

        <DataGrid
          localeText={{ noRowsLabel: 'No saved data' }}
          rows={rowData}
          rowCount={totalCount}
          columns={columns}
          onPaginationModelChange={handlePageChange}
          initialState={{
            pagination: {
              paginationModel: { page: page, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          pagination
          paginationMode="server"
          loading={isLoading}
          sx={{
            height: 'auto',
            '.MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#AFC3D9',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#AFC3D9', // Change table header color
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(odd)': {
                backgroundColor: '#E0EFFF', // Change background color of odd rows
              },
              '&:nth-of-type(even)': {
                backgroundColor: '#E0EFFF', // Change background color of odd rows
              },
            },
            '& .MuiDataGrid-overlay': {
              zIndex: '20',
            },
            '.MuiDataGrid-overlayWrapper': {
              height: 'auto !important',
            },
            '.MuiDataGrid-overlayWrapperInner': {
              height: 'auto !important',
            },
            // borderRadius: '16px',
            fontFamily: 'Outfit',
            fontSize: {
              xs: '12px',
              md: '1rem',
            },
          }}
        />
      </div>
    </section>
  )
}
