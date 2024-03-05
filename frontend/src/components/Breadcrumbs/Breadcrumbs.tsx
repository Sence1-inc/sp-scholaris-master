import React from 'react'
import { Link } from 'react-router-dom'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch } from '../../redux/store'
import './Breadcrumbs.css'

const Breadcrumbs: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <p className="container_breadcrumbs">
      <Link to="/student" onClick={() => dispatch(initializeParams({}))}>
        Student
      </Link>{' '}
      / <Link to="/scholarships">Scholarships</Link>
    </p>
  )
}

export default Breadcrumbs
