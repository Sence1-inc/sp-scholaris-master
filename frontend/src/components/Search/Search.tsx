import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import queryString from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import { ctaButtonStyle } from '../../styles/globalStyles'
import Filter from '../Filter/Filter'
import Table from '../Table/Table'
import './Search.css'

interface SearchProps {
  isSection: boolean
}

const Search: React.FC<SearchProps> = ({ isSection }) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.searchParams)
  const navigate = useNavigate()
  const scholarships = useAppSelector((state) => state.scholarships)
  const { getScholarships } = useGetScholarships()
  const [name, setName] = useState<string>(params.params.name as string)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { hash } = useLocation()
  const searchRef = useRef<HTMLElement>(null)

  const data: any = scholarships

  useEffect(() => {
    if (isSection) {
      getScholarships(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSection])

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
    e.preventDefault()
    dispatch(initializeParams({ ...params.params, ...(name ? { name } : {}) }))
  }

  const handleChange = async (value: string) => {
    setName(value)
  }

  useEffect(() => {
    if (!params.params.name) {
      setName('')
    }

    if (Object.keys(params.params).length > 0) {
      const queryParams = queryString.stringify(params.params)
      navigate(`/scholarships?${queryParams}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.params])

  return (
    <section ref={searchRef} id="search" className="search">
      {isSection ? (
        <div className="container-1040">
          <div className="section-header">
            <h3 className="color-secondary">Scholaris</h3>
            <h2>Step into a world of opportunities</h2>
          </div>
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
          {window.innerWidth > theme.breakpoints.values.md ? (
            <Table
              hasPagination={false}
              scholarships={data.scholarships as Scholarship[]}
            />
          ) : (
            <Typography sx={{ textAlign: 'center' }}>
              You can see the results on a larger display or switch to landscape
              mode for better viewing.
            </Typography>
          )}
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
          <Filter />
        </div>
      )}
    </section>
  )
}

export default Search
