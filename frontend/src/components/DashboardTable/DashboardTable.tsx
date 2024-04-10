import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import useGetScholarshipsData from '../../hooks/useGetScholarshipData'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeScholarships } from '../../redux/reducers/ScholarshipsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'

interface GridRowDef {
  id: number
  scholarshipName: string
  startDate: Date
  endDate: Date
  status: string
}

export default function DataTable() {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const { getScholarships } = useGetScholarships()
  const { getScholarshipData } = useGetScholarshipsData()
  const data: any = useAppSelector((state) => state.scholarships)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (data.scholarships.length > 0) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [data])

  useEffect(() => {
    if (data.scholarships && data.scholarships.length > 0) {
      const row = data.scholarships.map((scholarship: Scholarship) => {
        return {
          id: scholarship.id,
          scholarshipName: scholarship.scholarship_name,
          startDate: new Date(scholarship.start_date),
          endDate: new Date(scholarship.due_date),
          status: scholarship.status,
        }
      })

      setRowData(row)
    }
  }, [data])

  useEffect(() => {
    if (!isSnackbarOpen) {
      setSuccessMessage('')
    }
  }, [isSnackbarOpen])

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/scholarships/${selectedRow}`,
        { withCredentials: true }
      )
      console.log(response)
      if (response) {
        setIsSnackbarOpen(true)
        setSuccessMessage(response.data.message)
        dispatch(initializeScholarships(response.data.scholarships))
      }
    } catch (error) {
      setErrorMessage('Error deleting scholarship')
    }
  }

  useEffect(() => {
    const getProviderScholarships = async () => {
      try {
        const response = await axiosInstance.get(
          `api/v1/scholarship_providers/${user.scholarship_provider.id}/scholarships`,
          { withCredentials: true }
        )

        if (response.status === 200) {
          dispatch(initializeScholarships(response.data as Scholarship[]))
        }
      } catch (error: any) {
        console.log()
        dispatch(initializeScholarships([]))
        if (error.response.status === 403) {
          navigate('/')
        }
      }
    }

    getProviderScholarships()
  }, [])

  const renderActions = (params: any) => {
    return (
      <Box>
        <Tooltip title="View">
          <IconButton
            onClick={() => navigate(`/scholarships/${params.row.id}`)}
            sx={{ color: '#06A5FF' }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              getScholarshipData(params.row.id)
              navigate(`/scholarships/${params.row.id}/update`)
            }}
            sx={{ color: '#1F4BEA' }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              setSelectedRow(params.row.id)
              setIsSnackbarOpen(true)
            }}
            sx={{ color: '#F50F0F' }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'scholarshipName', headerName: 'Scholarship Name', flex: 1.5 },
    { field: 'startDate', headerName: 'Start Date', type: 'date', flex: 0.5 },
    { field: 'endDate', headerName: 'End Date', type: 'date', flex: 0.5 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      renderCell: (params: any) => renderActions(params),
    },
  ]

  return (
    <div style={{ height: 'auto', width: '100%', borderRadius: '16px' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={6000}
        key="topcenter"
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={successMessage ? 'success' : 'warning'}
          variant={successMessage ? 'filled' : 'standard'}
          sx={{ width: '100%' }}
        >
          {successMessage ? (
            <Typography>{successMessage}</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>Are you sure you want to delete?</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  color="primary"
                  onClick={() => setIsSnackbarOpen(false)}
                  sx={{ alignSelf: 'center' }}
                >
                  Cancel
                </Button>
                <Button
                  color="inherit"
                  onClick={handleDelete}
                  sx={{ alignSelf: 'center' }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          )}
        </Alert>
      </Snackbar>
      <DataGrid
        rows={rowData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        loading={isLoading}
        sx={{
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
              backgroundColor: '#D8D8D8', // Change background color of odd rows
            },
            '&:nth-of-type(even)': {
              backgroundColor: '#F1F1F1', // Change background color of odd rows
            },
          },
          borderRadius: '16px',
          fontFamily: 'Outfit',
          fontSize: {
            xs: '12px',
            md: '1rem',
          },
        }}
      />
    </div>
  )
}
