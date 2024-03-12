import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch } from '../../redux/store'
import './Breadcrumbs.css'

const Breadcrumbs: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <Typography variant="body1">
      <Link
        style={{ textDecoration: 'none', color: 'var(--primary-color)' }}
        to="/student"
        onClick={() => dispatch(initializeParams({}))}
      >
        Student
      </Link>{' '}
      /{' '}
      <Link
        style={{ textDecoration: 'none', color: 'var(--primary-color)' }}
        to="/scholarships"
      >
        Scholarships
      </Link>
    </Typography>
  )
}

export default Breadcrumbs
