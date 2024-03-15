import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

/* sample data - move to a separate file */
const rows = [
  {
    id: 1,
    scholarshipName:
      'Tulong Dunong Scholarship Tulong Dunong Scholarship Tulong Dunong Scholarship',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  }, //actions are not included in the rows.
  {
    id: 2,
    scholarshipName: 'Math and Science Scholarship',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  },
  {
    id: 3,
    scholarshipName: 'Robinsons Scholarship (Full)',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  },
  {
    id: 4,
    scholarshipName: 'Gokongwei Brothers Grant',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  }, //actions are not included in the rows.
  {
    id: 5,
    scholarshipName: 'Green Archers Scholarship Grant',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  },
  {
    id: 6,
    scholarshipName: 'Western Visayas Scholarship Grant',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  },
  {
    id: 7,
    scholarshipName: 'North Luzon Scholarship Grant',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  }, //actions are not included in the rows.
  {
    id: 8,
    scholarshipName: 'Sagip Scholarship Grant',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  },
  {
    id: 9,
    scholarshipName: 'Ayala Scholarship',
    startDate: new Date(2023, 12, 9),
    endDate: new Date(2024, 1, 10),
    status: 'Active',
  },
]

const renderActions = () => {
  return (
    <Box>
      <Tooltip title="View">
        <IconButton sx={{ color: '#06A5FF' }}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton sx={{ color: '#1F4BEA' }}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton sx={{ color: '#F50F0F' }}>
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
    renderCell: renderActions,
  },
]

export default function DataTable() {
  return (
    <div style={{ height: 'auto', width: '100%', borderRadius: '16px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
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
