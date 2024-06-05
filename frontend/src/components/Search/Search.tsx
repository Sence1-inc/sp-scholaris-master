import { OpenInNew } from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import { ctaButtonStyle } from '../../styles/globalStyles'
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
  const theme = useTheme()
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
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
  const { scholarships, total_pages, total_count } = data.scholarships
  const [searchParams] = useSearchParams()
  const { benefits, provider, start_date, due_date } = params.params
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(10)
  const [rowData, setRowData] = useState<GridRowDef[]>([])

  const formatString = (str: string) => {
    return str
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  useEffect(() => {
    setIsInitialLoad(false)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (Array.isArray(scholarships) && scholarships.length > 0) {
      formatScholarships(scholarships)
    } else {
      setRowData([])
    }
    setTotalCount(total_count)
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

    if (searchParams.size === 0 && !isSection) {
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
  }, [nameParam, isInitialLoad])

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

  const handlePageChange = (par: { page: number; pageSize: number }) => {
    setIsLoading(true)
  }

  return (
    <section ref={searchRef} id="search" className="search">
      {isSection ? (
        <div className="container-1040">
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
              gap: '40px',
              width: '80vw',
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleChange(e.target.value)}
              value={name}
              placeholder="Search Scholarship Name"
              sx={{ width: 'calc(66.666% - 20px)' }}
            />
            <Button
              sx={{ ...ctaButtonStyle, flexGrow: 1 }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Filter />
          <DataGrid
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
                xs: '12px',
                md: '1rem',
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
              gap: '40px',
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleChange(e.target.value)}
              value={name}
              placeholder="Search Scholarship Name"
              sx={{ width: 'calc(66.666% - 20px)' }}
            />
            <Button
              sx={{ ...ctaButtonStyle, flexGrow: 1 }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          {Object.keys(restParams).length > 0 && (
            <Box>
              <Stack direction="row" spacing={1}>
                {Object.entries(restParams)?.map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${formatString(key)}: ${value}`}
                    variant="outlined"
                    onDelete={() => handleChipDelete(key)}
                  />
                ))}
              </Stack>
            </Box>
          )}
          <Filter />
        </div>
      )}
    </section>
  )
}

export default Search
