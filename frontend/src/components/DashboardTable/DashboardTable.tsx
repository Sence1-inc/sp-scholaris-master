import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import useGetScholarshipsData from '../../hooks/useGetScholarshipData'
import { initializeScholarshipData } from '../../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import { useSnackbar } from '../../context/SnackBarContext';


interface GridRowDef {
  id: number
  scholarshipName: string
  startDate: Date
  endDate: Date
  status: string
}

export default function DataTable() {
  const navigate = useNavigate()
  const { showMessage } = useSnackbar();
  const user = useAppSelector((state) => state.persistedReducer.user)
  const dispatch = useAppDispatch()
  const { getScholarshipData } = useGetScholarshipsData()
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [rowCount, setRowCount] = useState<number>(0)

  useEffect(() => {
    if (rowCount === 0) {
      setIsLoading(false)
    }
  }, [rowCount])

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.delete(
        `/api/v1/scholarships/${selectedRow}?page=${page + 1}&limit=${pageSize}`,
        {
          timeout: 100000,
          withCredentials: true,
        }
      )
      setIsLoading(false)
      if (response.data) {
        showMessage('Successfully Deleted', 'success')
        formatScholarships(response.data.scholarships)
      }
    } catch (error) {
      setIsLoading(false)
      if (error) {
        showMessage('Error deleting scholarship', 'error')
      }
    }
  }

  useEffect(() => {
    dispatch(initializeScholarshipData({}))
    // eslint-disable-next-line
  }, [])

  const formatScholarships = (data: Scholarship[]) => {
    const row = data.map((scholarship: Scholarship) => {
      return {
        id: scholarship.id,
        listing_id: scholarship.listing_id,
        scholarshipName: scholarship.scholarship_name,
        startDate: new Date(scholarship.start_date),
        endDate: new Date(scholarship.due_date),
        status: scholarship.status,
      }
    })

    setRowData(row)
  }

  useEffect(() => {
    const getProviderScholarships = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get(
          `api/v1/scholarship_providers/${user.scholarship_provider.id}/scholarships?page=${page + 1}&limit=${pageSize}`,
          {
            timeout: 100000,
            withCredentials: true,
          }
        )

        if (response.status === 200) {
          setIsLoading(false)
          setRowCount(response.data.total_count)
          formatScholarships(response.data.scholarships)
        }
      } catch (error: any) {
        setIsLoading(false)
        if (error) {
          setRowData([])
          if (error.response && error.response.status === 403) {
            navigate('/')
          }
        }
      }
    }

    getProviderScholarships()
    // eslint-disable-next-line
  }, [page, pageSize])

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
              showMessage('Are you sure you want to delete?', 'warning', 8000, handleDelete)
              setSelectedRow(params.row.id)
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
    // { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'listing_id', headerName: 'Listing ID', flex: 0.5 },
    {
      field: 'scholarshipName',
      headerName: 'Scholarship Name',
      flex: 1
    },
    { field: 'startDate', headerName: 'Start Date', type: 'date', flex: 0.5 },
    { field: 'endDate', headerName: 'End Date', type: 'date', flex: 0.5 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.5,
      renderCell: (params: any) => renderActions(params),
    },
  ]

  const handlePageChange = (params: { page: number; pageSize: number }) => {
    setPage(params.page)
    setPageSize(params.pageSize)
  }

  return (
    <div style={{ height: 'auto', width: '100%', borderRadius: '16px'}}>
      <DataGrid
        localeText={{ noRowsLabel: 'No saved data' }}
        rows={rowData}
        rowCount={rowCount}
        columns={columns}
        onPaginationModelChange={handlePageChange}
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        pagination
        paginationMode="server"
        loading={isLoading}
        sx={{
          height: Array.isArray(rowData) && rowData?.length > 0 ? 'auto' : 200,
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
          '& .MuiDataGrid-overlay': {
            zIndex: '20',
          },
          borderRadius: '16px',
          fontFamily: 'Outfit',
          fontSize: {
            xs: '1rem'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'secondary.main',
          },
        }}
      />
    </div>
  )
}
