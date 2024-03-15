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
import useGetScholarships from '../../hooks/useGetScholarships'
import { useAppSelector } from '../../redux/store'
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
  const { getScholarships } = useGetScholarships()
  const data: any = useAppSelector((state) => state.scholarships)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [successMessage, setSuccessMessage] = useState<string>('')

  useEffect(() => {
    getScholarships(false)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (data.scholarships) {
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
        `/api/v1/scholarships/${selectedRow}`
      )
      console.log(response)
      if (response) {
        setIsSnackbarOpen(true)
        setSuccessMessage(response.data.message)
        getScholarships(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
            onClick={() => navigate(`/scholarships/${params.row.id}/update`)}
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
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage ? (
            <Typography>{successMessage}</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography>Are you sure you want to delete?</Typography>
              <Button
                color="inherit"
                onClick={handleDelete}
                sx={{ alignSelf: 'center' }}
              >
                Delete
              </Button>
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
