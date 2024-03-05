import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Scholarship } from '../../redux/types'
import viewSvg from '../../public/images/view.svg'
import './Table.css'

interface TableProps {
  hasPagination: boolean
  scholarships: Scholarship[]
  page?: number
  handlePrevious?: () => void
  handleNext?: () => void
}

export const Table: React.FC<TableProps> = ({
  hasPagination,
  scholarships,
  page,
  handlePrevious,
  handleNext,
}) => {
  return (
    <>
      <div className="search__results-container">
        <div className="search__results-header">
          <p>Scholarship Details</p>
          <p>Application Start Date</p>
          <p>Application Due Date</p>
          <p>Provider</p>
          <p>Actions</p>
        </div>
        {scholarships.length > 0 ? (
          scholarships.map((scholarship: Scholarship, index: number) => (
            <ul key={index}>
              <li className="search__results-content">
                <p className="search__results-item">
                  {scholarship.scholarship_name}
                </p>
                <p className="search__results-item">
                  {format(new Date(scholarship.start_date), 'MMM dd, yyyy')}
                </p>
                <p className="search__results-item">
                  {format(new Date(scholarship.due_date), 'MMM dd, yyyy')}
                </p>
                <p className="search__results-item">
                  {scholarship.scholarship_provider.provider_name}
                </p>
                <Link to={'/'} className="seach__results-link">
                  View
                  <img src={viewSvg} alt="View icon" />
                </Link>
              </li>
            </ul>
          ))
        ) : (
          <ul>
            <li className="search__results-content">
              <p className="search__results-item">No scholarship found.</p>
            </li>
          </ul>
        )}
      </div>
      {hasPagination && (
        <div className="search__results-pagination">
          <p>
            Results: <span>{scholarships.length}</span>
          </p>
          <p className={page === 1 ? 'disabled' : ''} onClick={handlePrevious}>
            Previous
          </p>
          <p>
            Page: <span>{page}</span>
          </p>
          <p
            className={scholarships.length < 10 ? 'disabled' : ''}
            onClick={handleNext}
          >
            Next
          </p>
        </div>
      )}
    </>
  )
}

export default Table
