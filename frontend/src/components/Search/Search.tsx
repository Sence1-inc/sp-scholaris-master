import { OpenInNew, Visibility } from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import { ctaButtonStyle } from '../../styles/globalStyles'
import theme from '../../styles/theme'
import Filter from '../Filter/Filter'
import './Search.css'

interface GridRowDef {
  scholarshipName: string
  startDate: Date
  endDate: Date
  provider: string
}

interface SearchProps {
  isSection: boolean
}

const Search: React.FC<SearchProps> = ({ isSection }) => {
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.searchParams)
  const navigate = useNavigate()
  const data: any = useAppSelector(
    (state) => state.persistedReducer.scholarships
  )
  const { getScholarships } = useGetScholarships()
  const { name: nameParam, page, limit, ...restParams } = params.params
  const [name, setName] = useState<string>(nameParam as string)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { hash } = useLocation()
  const searchRef = useRef<HTMLElement>(null)
  const isInitialLoad = useRef<boolean>(false)
  const { scholarships, total_count } = data.scholarships
  const { benefits, provider, start_date, due_date } = params.params
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(10)
  const [rowData, setRowData] = useState<GridRowDef[]>([])

  const xs = useMediaQuery(theme.breakpoints.up('xs'))
  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  const formatString = (str: string) => {
    return str
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  useEffect(() => {
    if (!isInitialLoad.current) {
      isInitialLoad.current = true
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (Array.isArray(scholarships) && scholarships.length > 0) {
      formatScholarships(scholarships)
    } else {
      setRowData([])
    }
    setTotalCount(total_count)
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
    if (Object.keys(params.params).length === 0 && isSection) {
      getScholarships(false)
    }
    // eslint-disable-next-line
  }, [params.params])

  const handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void = async (
    e
  ) => {
    const queryParams = queryString.stringify({ name })
    navigate(`/scholarships?${queryParams}`)

    getScholarships()
  }

  const handleChange = async (value: string) => {
    setName(value)
  }

  useEffect(() => {
    if ((benefits || provider || start_date || due_date) && !isSection) {
      getScholarships()
    }
    // eslint-disable-next-line
  }, [benefits, provider, start_date, due_date, isSection])

  useEffect(() => {
    if (nameParam) {
      setName(nameParam as string)
    } else {
      setName('')
    }
    // eslint-disable-next-line
  }, [nameParam])

  useEffect(() => {
    if (!isSection && !name && !isInitialLoad) {
      getScholarships()
    }
    // eslint-disable-next-line
  }, [name, isInitialLoad, isSection])

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

  const handleChipDelete = (key: string) => {
    const { [key]: _, ...rest } = params.params
    dispatch(initializeParams(rest))
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

  const columns = [
    {
      field: 'scholarshipName',
      headerName: 'Scholarship Name',
      ...(sm ? { flex: 1.5 } : { width: 200 }),
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      type: 'date',
      ...(sm ? { flex: 1 } : { width: 150 }),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      type: 'date',
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
        {xs ? (
          <IconButton
            onClick={() => navigate(`/scholarships/${params.row.id}`)}
            sx={{ color: 'primary.main', display: 'flex', gap: '4px' }}
          >
            <Typography variant="body1">View</Typography> <Visibility />
          </IconButton>
        ) : (
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
        )}
      </Box>
    )
  }

  const handlePageChange = (par: { page: number; pageSize: number }) => {
    setIsLoading(true)
  }

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/scholarships/${params.row.id}`)
  }

  return (
    <section ref={searchRef} id="search" className="search">
      {isSection ? (
        <div className="container-1040" style={{ gap: '20px' }}>
          <div className="section-header">
            <Typography variant="h3" sx={{ color: 'secondary.main' }}>
              Scholaris
            </Typography>
            <Typography variant="h2">
              Step into a world of opportunities
            </Typography>
          </div>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: '7px', sm: '10px' },
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleChange(e.target.value)}
              value={name}
              placeholder="e.g. CHED Merit Scholarship"
              sx={{
                width: {
                  xs: 'calc(95% - 20px)',
                  sm: 'calc(66.666% - 20px)',
                  md: 'calc(80% - 20px)',
                },
                padding: { sm: '16px' },
                fontSize: { xs: '14px', sm: '17px' },
                maxHeight: { sm: '58px', md: '63px' },
              }}
            />
            <Button
              id="search"
              sx={{
                ...ctaButtonStyle,
                flexGrow: 1,
                padding: { xs: '16px' },
                fontSize: { xs: '14px', sm: '17px' },
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Filter />
          {Object.keys(restParams).length > 0 && (
            <Box>
              <Stack
                direction="row"
                sx={{ flexWrap: 'wrap', width: '100%', gap: '8px' }}
              >
                {Object.entries(restParams).map(([key, value]) => {
                  return key === 'limit' || key === 'page' ? null : (
                    <Chip
                      key={key}
                      label={
                        key === 'start_date'
                          ? `${formatString(key)}: ${dayjs(value).format('MMMM YYYY')}`
                          : `${formatString(key)}: ${value}`
                      }
                      variant="outlined"
                      onDelete={() => handleChipDelete(key)}
                    />
                  )
                })}
              </Stack>
            </Box>
          )}

          <DataGrid
            onRowClick={handleRowClick}
            localeText={{ noRowsLabel: 'No saved data' }}
            rows={rowData}
            rowCount={totalCount}
            columns={columns}
            onPaginationModelChange={handlePageChange}
            initialState={{
              pagination: {
                paginationModel: { page: 1, pageSize: 10 },
              },
            }}
            hideFooter={true}
            paginationMode="server"
            loading={isLoading}
            sx={{
              height:
                Array.isArray(scholarships) && scholarships?.length > 0
                  ? 'auto'
                  : 200,
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
      ) : (
        <div className="search__input-container">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: '7px', sm: '10px', md: '40px' },
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleChange(e.target.value)}
              value={name}
              placeholder="e.g. CHED Merit Scholarship"
              sx={{
                width: { xs: 'calc(95% - 20px)', sm: 'calc(80% - 20px)' },
                padding: { xs: '16px' },
              }}
            />
            <Button
              id="search"
              sx={{
                ...ctaButtonStyle,
                flexGrow: 1,
                padding: { sm: '16px' },
                fontSize: { xs: '14px', sm: '17px', maxHeight: '58px' },
                height: { xs: '58px', md: '63px' },
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Filter />
          {Object.keys(restParams).length > 0 && (
            <Box>
              <Stack
                direction="row"
                sx={{ flexWrap: 'wrap', width: '100%', gap: '8px' }}
              >
                {Object.entries(restParams)?.map(([key, value]) => (
                  <Chip
                    key={key}
                    label={
                      key === 'start_date'
                        ? `${formatString(key)}: ${dayjs(value).format('MMMM YYYY')}`
                        : `${formatString(key)}: ${value}`
                    }
                    variant="outlined"
                    onDelete={() => handleChipDelete(key)}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </div>
      )}
    </section>
  )
}

export default Search
