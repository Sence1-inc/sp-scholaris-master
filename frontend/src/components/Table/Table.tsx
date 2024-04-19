import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Scholarship } from '../../redux/types'
import './Table.css'

interface TableProps {
  hasPagination: boolean
  scholarships: Scholarship[]
  total_count?: number
  page?: number
  handlePrevious?: () => void
  handleNext?: () => void
}

export const Table: React.FC<TableProps> = ({
  hasPagination,
  scholarships,
  page,
  total_count,
  handlePrevious,
  handleNext,
}) => {
  return (
    <>
      <div className="search__results-container">
        <div className="search__results-header">
          <Typography variant="body1">Scholarship Details</Typography>
          <Typography variant="body1">Application Start Date</Typography>
          <Typography variant="body1">Application Due Date</Typography>
          <Typography variant="body1">Provider</Typography>
          <Typography variant="body1">Actions</Typography>
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
                <Typography
                  color="secondary"
                  component={Link}
                  to={`/scholarships/${scholarship.id}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '150px',
                  }}
                >
                  View
                  <OpenInNewIcon fontSize="small" />
                </Typography>
              </li>
            </ul>
          ))
        ) : (
          <ul>
            <li className="search__results-content">
              <Typography variant="h5">No scholarship found.</Typography>
            </li>
          </ul>
        )}
      </div>
      {hasPagination && (
        <div className="search__results-pagination">
          <Typography variant="h6" sx={{ color: 'secondary.main' }}>
            Total Results: <span>{total_count}</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'secondary.main',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
            }}
            {...(page && page > 1 && { onClick: handlePrevious })}
          >
            Previous
          </Typography>
          <Typography variant="h6" sx={{ color: 'secondary.main' }}>
            Page: <span>{page}</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'secondary.main',
              cursor: scholarships.length < 10 ? 'not-allowed' : 'pointer',
            }}
            {...(scholarships.length >= 10 && { onClick: handleNext })}
          >
            Next
          </Typography>
        </div>
      )}
    </>
  )
}

export default Table
