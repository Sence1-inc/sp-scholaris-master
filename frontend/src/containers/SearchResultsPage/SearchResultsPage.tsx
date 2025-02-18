import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import HomeIcon from '@mui/icons-material/Home'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { DataGrid, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import Search from '../../components/Search/Search'
import { useSnackbar } from '../../context/SnackBarContext'
import { useScholarshipCache } from '../../hooks/useScholarshipCache'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import { containerStyle } from '../../styles/globalStyles'
import theme from '../../styles/theme'
import './SearchResultsPage.css'

interface GridRowDef {
  id: number
  bookmarkId: number
  scholarshipId: number
  scholarshipName: string
  startDate: string | Date
  endDate: string | Date
  provider: string
  isBookmarked: boolean
}

interface SearchResultsPageProps {
  isASection: boolean
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  isASection,
}) => {
  const { showMessage } = useSnackbar()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(
    (state) => state.isAuthenticated
  )
  const { getScholarships } = useScholarshipCache()
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
    (state) => state.scholarships
  )
  const [page, setPage] = useState<number>(1)
  const params = useAppSelector((state) => state.searchParams)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(10)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const user = useAppSelector((state) => state.user)

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
      renderCell: (params: GridRenderCellParams) => renderActions(params),
    },
  ]

  const handleSaveButton = async (params: GridRenderCellParams) => {
    if (!isAuthenticated) {
      navigate('/sign-in')
    }

    const scholarshipData = {
      user_id: user.id,
      scholarship_id: params.row.id,
    }
    try {
      const response = await axiosInstance.post(
        `/api/v1/bookmarks`,
        scholarshipData
      )
      const updatedScholarship = response.data.scholarship

      const updatedRows = rowData.map((row) =>
        row.id === updatedScholarship.id
          ? {
              ...row,
              isBookmarked: updatedScholarship.is_bookmarked,
              bookmarkId: updatedScholarship.bookmark_id,
            }
          : row
      )

      setRowData([...updatedRows])
      showMessage(response.data.message, 'success')
    } catch (error: any) {
      showMessage(error.response.data.error, 'error')
    }
  }

  const handleUnsaveButton = async (params: GridRenderCellParams) => {
    try {
      const response = await axiosInstance.post(
        `api/v1/bookmarks/remove_bookmark`,
        {
          bookmark_id: Number(params.row.bookmarkId),
          user_id: user.id,
        }
      )
      const updatedScholarship = response.data.scholarship

      const updatedRows = rowData.map((row) =>
        row.id === updatedScholarship.id
          ? {
              ...row,
              isBookmarked: updatedScholarship.is_bookmarked,
              bookmarkId: updatedScholarship.bookmark_id,
            }
          : row
      )

      setRowData([...updatedRows])
      showMessage(response.data.message, 'success')
    } catch (error: any) {
      showMessage(error.response.data.error, 'error')
    }
  }

  const renderActions = (params: GridRenderCellParams) => {
    const isBookmarked = params.row.isBookmarked

    return (
      <Box
        sx={{
          ...containerStyle,
          padding: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '8px',
          width: '150px',
        }}
      >
        <Button
          onClick={() => navigate(`/scholarships/${params.row.id}`)}
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: 'black',
            padding: '5px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '50px',
            maxHeight: '32px',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <VisibilityIcon fontSize="small" />
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            !isBookmarked
              ? handleSaveButton(params)
              : handleUnsaveButton(params)
          }
          sx={{
            backgroundColor: !isBookmarked ? 'white' : '#002147',
            color: 'black',
            padding: '5px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '50px',
            maxHeight: '32px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          key={isBookmarked ? 'bookmarked' : 'not-bookmarked'}
        >
          <StarBorderIcon
            fontSize="small"
            sx={{
              color: isBookmarked ? 'white' : '#002147',
            }}
          />
        </Button>
      </Box>
    )
  }

  const formatScholarships = (data: Scholarship[]) => {
    const row = data.map((scholarship: Scholarship) => {
      return {
        id: scholarship.id,
        bookmarkId: Number(scholarship.bookmark_id),
        scholarshipId: Number(scholarship.id),
        scholarshipName: scholarship.scholarship_name,
        startDate: new Date(scholarship.start_date).toDateString(),
        endDate: new Date(scholarship.due_date).toDateString(),
        provider: scholarship.scholarship_provider.provider_name,
        isBookmarked: scholarship.is_bookmarked,
      }
    })
    setIsLoading(false)
    setRowData(row)
  }

  const handlePageChange = (par: { page: number; pageSize: number }) => {
    setIsLoading(true)
    setPage(Math.max(par.page + 1, 1))
  }

  // Single effect to handle URL params
  useEffect(() => {
    const currentData = {
      ...(course && { course }),
      ...(school && { school }),
      ...(benefits && { benefits }),
      ...(location && { location }),
      ...(start_date && { start_date }),
      ...(due_date && { due_date }),
      ...(provider && { provider }),
      ...(name && { name }),
    }

    const hasUrlParams = Object.values(currentData).some(value => value !== undefined && value !== '')
    if (hasUrlParams) {
      dispatch(initializeParams({ ...params.params, ...currentData }))
      getScholarships(false)
    }
     // eslint-disable-next-line
  }, [course, school, benefits, location, start_date, due_date, provider, name])

  // Combined effect for both initial load and page changes
  useEffect(() => {
    if (isInitialLoad) {
      getScholarships(false)
      setIsInitialLoad(false)
    } else if (page > 0) {
      dispatch(initializeParams({ ...params.params, page: Math.max(page, 1) }))
      getScholarships(false)
    }
    setIsLoading(false)
     // eslint-disable-next-line
  }, [page, isInitialLoad])

  // Format scholarships when data changes
  useEffect(() => {
    if (Array.isArray(result.scholarships.scholarships)) {
      formatScholarships(result.scholarships.scholarships)
      setTotalCount(result.scholarships.total_count)
    } else {
      setRowData([])
    }
     // eslint-disable-next-line
  }, [result.scholarships])

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/scholarships/${params.row.id}`)
  }

  return (
    <section className="content">
      <Box sx={containerStyle} style={{ width: '100%' }}>
        <Button
          id="back-from-search-results-page"
          onClick={() => {
            navigate((Cookies.get('lastVisited') as string) ?? '/')
          }}
          sx={{
            alignSelf: 'flex-start',
            color: 'secondary.main',
            fontSize: '1.2rem',
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
              <ArrowBackIos sx={{ fontSize: '1.2rem' }} /> Back
            </>
          )}
        </Button>
        <Typography variant="h3">Search Results</Typography>
        <Search isSection={false} />
        {/* <Alert severity="warning">
          All scholarship listings are currently test data and not actual
          listings. We'll be updating them with real data soon, so stay tuned!
        </Alert> */}
        <DataGrid
          onRowClick={handleRowClick}
          localeText={{ noRowsLabel: 'No saved data' }}
          rows={rowData}
          rowCount={totalCount}
          columns={columns}
          onPaginationModelChange={handlePageChange}
          initialState={{
            pagination: {
              paginationModel: { page: Math.max(page - 1, 0), pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          pagination
          paginationMode="server"
          loading={isLoading}
          sx={{
            height:
              Array.isArray(rowData) && rowData?.length > 0 ? 'auto' : 200,
            '.MuiDataGrid-root': {
              border: 'none',
            },
            '.MuiDataGrid-main': {
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#AFC3D9',
            },
            '.MuiDataGrid-footerContainer': {
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
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
            borderRadius: '16px',
            fontFamily: 'Outfit',
            fontSize: {
              xs: '12px',
              md: '1rem',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'secondary.main',
            },
          }}
        />
        <Typography variant="body1">
          For Scholarship Granting Organizations:
          <br />
          If you are a scholarship granting organization and would like to
          request edits to the listed data, please contact us with the title and
          details page link of the relevant scholarship at
          support-scholaris@sence1.com
        </Typography>
      </Box>
    </section>
  )
}
