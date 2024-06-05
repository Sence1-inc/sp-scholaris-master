import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import { ctaButtonStyle } from '../../styles/globalStyles'
import Filter from '../Filter/Filter'
import './Search.css'

interface GridRowDef {
  scholarshipName: string
  provider: string
}

const WelcomePageSearch: React.FC = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.searchParams)
  const navigate = useNavigate()
  const data: any = useAppSelector(
    (state) => state.persistedReducer.scholarships
  )
  const { getScholarships } = useGetScholarships()
  const { name: nameParam, page, ...restParams } = params.params
  const [name, setName] = useState<string>(nameParam as string)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { hash } = useLocation()
  const searchRef = useRef<HTMLElement>(null)
  const { scholarships } = data.scholarships
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rowData, setRowData] = useState<GridRowDef[]>([])

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

  const handleChipDelete = (key: string) => {
    const { [key]: _, ...rest } = params.params
    dispatch(initializeParams(rest))
  }

  const formatScholarships = (data: Scholarship[]) => {
    const row = data.map((scholarship: Scholarship) => {
      return {
        id: scholarship.id,
        scholarshipName: scholarship.scholarship_name,
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
    { field: 'provider', headerName: 'Organization', type: 'string', flex: 1 },
  ]

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/scholarships/${params.row.id}`)
  }

  return (
    <section ref={searchRef} id="search" className="search">
      <div
        className="search__input-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '60px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: 'secondary.main', textAlign: 'center' }}
        >
          Looking for Scholarships?
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
          <Filter />
          {Object.keys(restParams).length > 0 && (
            <Box>
              <Stack direction="row" spacing={1}>
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
          <div style={{ height: 100 }}>
            <DataGrid
              onRowClick={handleRowClick}
              localeText={{ noRowsLabel: 'No saved data' }}
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
        </Box>
      </div>
    </section>
  )
}

export default WelcomePageSearch
