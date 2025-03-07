import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Modal
} from '@mui/material'
import { DataGrid, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import VisibilityIcon from '@mui/icons-material/Visibility'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useScholarshipCache } from '../../hooks/useScholarshipCache'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship, User } from '../../redux/types'
import axiosInstance from '../../axiosConfig'
import { ctaButtonStyle, containerStyle } from '../../styles/globalStyles'
import { useSnackbar } from '../../context/SnackBarContext'
import theme from '../../styles/theme'
import Filter from '../Filter/Filter'
import SignIn from '../../components/SignIn/SignIn'
import './Search.css'

interface GridRowDef {
  id: number
  bookmarkId: number | null
  scholarshipId: number
  scholarshipName: string
  startDate: string | Date
  endDate: string | Date
  provider: string
  isBookmarked: boolean
}

const WelcomePageSearch: React.FC = () => {
  const dispatch = useAppDispatch()
  const params: any = useAppSelector((state) => state.searchParams)
  const navigate = useNavigate()
  const { showMessage } = useSnackbar()
  const data: any = useAppSelector(
    (state) => state.scholarships
  )
  const user: User = useAppSelector((state) => state.user)
  const { getScholarships } = useScholarshipCache()
  const { name: nameParam, page, limit, ...restParams } = params.params
  const [name, setName] = useState<string>(nameParam as string)
  const [hasScrolled, setHasScrolled] = useState(false)
  const  { hash } = useLocation()
  const location = useLocation()
  const searchRef = useRef<HTMLElement>(null)
  const { scholarships } = data.scholarships
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [, setSearchParams] = useSearchParams();
  const [isModalSignInOpen, setIsModalSignInOpen] = useState<boolean>(false)
  // const [scholarshipData, setScholarshipData] = useState<ScholarshipData>()
  const handleModalSignInOpen = () => setIsModalSignInOpen(true);
  const handleModalSignInClose = () => setIsModalSignInOpen(false);
  const isAuthenticated = useAppSelector(
    (state) => state.isAuthenticated
  )
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const xs = useMediaQuery(theme.breakpoints.up('xs'))

  const formatString = (str: string) => {
    return str
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  useEffect(() => {
    if (Array.isArray(scholarships) && scholarships.length > 0) {
      formatScholarships(scholarships.slice(0, 5))
    } else {
      setRowData([])
    }
    // eslint-disable-next-line
  }, [scholarships])

  useEffect(() => {
    if (searchRef.current && hash === '#search' && !hasScrolled) {
      searchRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'start',
      })

      setHasScrolled(true)
    }

    return () => {
      setHasScrolled(false)
    }
    // eslint-disable-next-line
  }, [searchRef, hash])

  useEffect(() => {
    if (Object.keys(params.params).length === 0) {
      getScholarships(false)
    }
    // eslint-disable-next-line
  }, [params.params])

  const handleSearch = async () => {
    const queryParams = queryString.stringify({ name })
    navigate(`/scholarships?${queryParams}`)

    getScholarships()
  }

  const handleChange = async (value: string) => {
    setName(value)
  }

  useEffect(() => {
    if (nameParam) {
      setName(nameParam as string)
    } else {
      setName('')
    }
    // eslint-disable-next-line
  }, [nameParam])

  useEffect(() => {
    if (name) {
      dispatch(
        initializeParams({
          ...params.params,
          name: name,
        })
      )
    } else {
      dispatch(initializeParams(restParams))
    }

    // eslint-disable-next-line
  }, [name])

  useEffect(() => {
    handleModalSignInClose()

    //the following code is for clearing the bookmark status
    if(!isAuthenticated) {
      clearBookmarkStatus();
    }
  }, [isAuthenticated])

  const clearBookmarkStatus = () => {
    rowData.map((row) => {
      row.isBookmarked = false;
      row.bookmarkId = null;
    })
  }

  const handleChipDelete = (key: string) => {
    const { [key]: _, ...rest } = params.params
    dispatch(initializeParams(rest))
    if (location.pathname === '/') {
      setSearchParams(
        Object.fromEntries(
          Object.entries(rest)
            .filter(([_, value]) => value != null)
            .map(([k, v]) => [k, String(v)])
        )
      )
      getScholarships(false)
    }
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
    setRowData(row)
    setIsLoading(false)
  }

  const columns = [
    {
      field: 'scholarshipName',
      headerName: 'Scholarship Name',
      ...(sm ? { flex: 1.5 } : { width: 200 }),
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      ...(sm ? { flex: 1.5 } : { width: 150 }),
    },
    {
      field: 'endDate',
      headerName: 'Due Date',
      ...(sm ? { flex: 1.5 } : { width: 150 }),
    },
    {
      field: 'provider',
      headerName: 'Organization',
      type: 'string',
      ...(sm ? { flex: 1.5 } : { width: 200 }),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      ...(sm ? { flex: 1 } : {}),
      renderCell: (params: GridRenderCellParams) => renderActions(params),
    }
  ]

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/scholarships/${params.row.id}`)
  }

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSaveButton = async (params: GridRenderCellParams) => {
    if(isAuthenticated) {
      const scholarshipData = {
        user_id: user.id,
        scholarship_id: params.id,
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
        // setScholarshipData({...params, 
        //   is_bookmarked: updatedScholarship.is_bookmarked,
        //   bookmark_id: updatedScholarship.bookmark_id}) 
        setRowData([...updatedRows])
        showMessage(response.data.message, 'success')
      } catch (error: any) {
        showMessage(error.response.data.error, 'error')
      }
    } else {
      handleModalSignInOpen();
    }
    
  }

  const handleUnsaveButton = async (params: GridRenderCellParams) => {
    try {
      const response = await axiosInstance.post(
        `api/v1/bookmarks/remove_bookmark`,
        {
          bookmark_id: Number(params.row.bookmark_id),
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
      // setScholarshipData({...params, 
      //   is_bookmarked: updatedScholarship.is_bookmarked,
      //   bookmark_id: updatedScholarship.bookmark_id}) 
      setRowData([...updatedRows])
      showMessage(response.data.message, 'success')
    } catch (error: any) {
      showMessage(error.response.data.error, 'error')
    }
  }


  const renderActions = (params: GridRenderCellParams) => {
    if(!isAuthenticated) {
      clearBookmarkStatus();
    }
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
        <Modal
          open={isModalSignInOpen}
          onClose={handleModalSignInClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '2.5vh auto',
            width: {xs: '95vw', sm: '60vw', lg: '40vw'},
            height: 'auto',
            maxHeight: '95vh',
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            overflowY: 'scroll'
          }}>
            <SignIn />
          </Box>
        </Modal>      
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
          onClick={() =>{
              !isBookmarked
                ? handleSaveButton(params)
                : handleUnsaveButton(params)
            }   
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

  return (
    
    <section
      ref={searchRef}
      id="search"
      className="search"
      style={{
        height: 'auto',
        width: '100%',
      }}
    >
      <Box
        className="search__input-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '100%', md: '90%' },
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: 'secondary.main', textAlign: 'center' }}
          >
            Struggling to Find Scholarships?
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: 'primary.main', textAlign: 'center' }}
          >
            Discover Thousands with Our App!
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: '7px', md: '10px' },
            }}
          >
            <TextField
              id="input-search-from-welcome-page"
              variant="outlined"
              onChange={(e) => handleChange(e.target.value)}
              value={name}
              onKeyDown={handleKeyDown}
              placeholder="e.g. CHED Merit Scholarship"
              sx={{
                width: { xs: 'calc(95% - 20px)', sm: 'calc(80% - 20px)' },
                padding: { xs: '16px' },
              }}
            />
            <Button
              id="search-from-welcome-page"
              sx={{
                ...ctaButtonStyle,
                flexGrow: 1,
                padding: { xs: '16px' },
                fontSize: { xs: '14px', sm: '17px' },
                height: { xs: '58px', md: '63px' },
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Filter />
          {Object.keys(restParams).length > 0 &&
            !Object.keys(restParams).includes('limit') &&
            !Object.keys(restParams).includes('page') && (
              <Box>
                <Stack
                  direction="row"
                  sx={{ flexWrap: 'wrap', width: '100%', gap: '8px' }}
                >
                  {Object.entries(restParams)?.map(([key, value]) => {
                    return (
                      <Chip
                        key={key}
                        label={`${formatString(key)}: ${value}`}
                        variant="outlined"
                        onDelete={() => handleChipDelete(key)}
                      />
                    )
                  })}
                </Stack>
              </Box>
            )}
          {/* <Alert severity="warning">
            All scholarship listings are currently test data and not actual
            listings. We'll be updating them with real data soon, so stay tuned!
          </Alert> */}
          <DataGrid
            onRowClick={handleRowClick}
            localeText={{ noRowsLabel: 'No saved data' }}
            columnVisibilityModel={{
              startDate: xs,
              dueDate: xs,
            }}
            rows={rowData}
            rowCount={5}
            columns={columns}
            autoPageSize
            initialState={{
              pagination: {
                paginationModel: { page: 1, pageSize: 5 },
              },
            }}
            hideFooter={true}
            paginationMode="server"
            loading={isLoading}
            sx={{
              height:
                Array.isArray(rowData) && rowData?.length > 0 ? 'auto' : 200,
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
        </Box>
      </Box>
    </section>
  )
}

export default WelcomePageSearch
