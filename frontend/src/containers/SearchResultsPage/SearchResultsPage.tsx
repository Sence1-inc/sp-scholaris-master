import { OpenInNew } from '@mui/icons-material'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import HomeIcon from '@mui/icons-material/Home'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import Cookies from 'js-cookie'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Search from '../../components/Search/Search'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import theme from '../../styles/theme'
import './SearchResultsPage.css'

interface GridRowDef {
  scholarshipName: string
  startDate: string | Date
  endDate: string | Date
  provider: string
}

interface SearchResultsPageProps {
  isASection: boolean
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  isASection,
}) => {
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
  const [totalCount, setTotalCount] = useState<number>(10)
  const [rowData, setRowData] = useState<GridRowDef[]>([])

  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  const columns = [
    {
      field: 'scholarshipName',
      headerName: 'Scholarship Name',
      ...(sm ? { flex: 1.5 } : { width: 200 }),
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      ...(sm ? { flex: 1 } : { width: 150 }),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      ...(sm ? { flex: 1 } : { width: 150 }),
    },
    {
      field: 'provider',
      headerName: 'Organization',
      type: 'string',
      ...(sm ? { flex: 1 } : { width: 200 }),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      ...(sm ? { flex: 1 } : {}),
      renderCell: (params: any) => renderActions(params),
    },
  ]

  const renderActions = (params: any) => {
    return (
      <Box>
        <Typography
          color="primary"
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
        startDate: new Date(scholarship.start_date).toDateString(),
        endDate: new Date(scholarship.due_date).toDateString(),
        provider: scholarship.scholarship_provider.provider_name,
      }
    })
    setIsLoading(false)
    setRowData(row)
  }

  const handlePageChange = (par: { page: number; pageSize: number }) => {
    setIsLoading(true)
    setPage(par.page + 1)
    dispatch(initializeParams({ ...params.params, limit: par.pageSize }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (page > 0) {
      dispatch(initializeParams({ ...params.params, page: page }))
    }
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    if (params.params.page) {
      getScholarships()
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
      ...params.params,
      ...(course && { course: course }),
      ...(school && { school: school }),
      ...(benefits && { benefits: benefits }),
      ...(location && { location: location }),
      ...(start_date && { start_date: start_date }),
      ...(due_date && { due_date: due_date }),
      ...(provider && { provider: provider }),
      ...(name && { name: name }),
    }

    dispatch(initializeParams(initialData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, school, benefits, location, start_date, due_date, provider, name])

  useEffect(() => {
    const queryParams = queryString.stringify(params.params)
    navigate(`/scholarships?${queryParams}`)
    // eslint-disable-next-line
  }, [params.params])

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/scholarships/${params.row.id}`)
  }

  return (
    <section className="search-results">
      <div className="container-1040" style={{ width: '100%' }}>
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
          onRowClick={handleRowClick}
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
          pageSizeOptions={[10]}
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
              minHeight: '200px',
              height:
                rowData.length > 0 ? 'auto !important' : '200px !important',
            },
            '.MuiDataGrid-overlayWrapperInner': {
              minHeight: '200px',
              height:
                rowData.length > 0 ? 'auto !important' : '200px !important',
            },
            fontFamily: 'Outfit',
            fontSize: {
              xs: '15px',
              md: '1rem',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'secondary.main',
              cursor: 'pointer',
            },
          }}
        />
      </div>
    </section>
  )
}
