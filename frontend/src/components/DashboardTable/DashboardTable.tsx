import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', flex: 0.3 },
  { field: 'scholarshipName', headerName: 'Scholarship Name', flex: 1.5 },
  { field: 'startDate', headerName: 'Start Date', type: "date", flex: 0.5 },
  { field: 'endDate', headerName: 'End Date', type: "date", flex: 0.5 },
  { field: 'status', headerName: 'Status', flex: 0.5 },
  { field: 'actions', headerName: 'Actions', type: "actions", flex: 1,
  getActions: () => [ //add params
    <GridActionsCellItem
      icon={<Button variant="contained" sx={{
        fontFamily: "Open Sans",
        fontSize:"10px",
        borderRadius: "15px",
        backgroundColor: "#06A5FF"
    }}>View</Button>}
      label="View"
      // onClick={viewScholarship(params.id)}
    />,
    <GridActionsCellItem
      icon={<Button variant="contained" sx={{
        fontFamily: "Open Sans",
        fontSize:"10px",
        borderRadius: "15px",
        backgroundColor: "#1F4BEA"
    }}>Edit</Button>}
      label="Edit"
      // onClick={editScholarship(params.id)}
    />,
    <GridActionsCellItem
      icon={<Button variant="contained" sx={{
        fontFamily: "Open Sans",
        fontSize:"10px",
        borderRadius: "15px",
        backgroundColor: "#F50F0F"
    }}>Delete</Button>}
      label="Delete"
      // onClick={deleteScholarship(params.id)}
    />
  ]
  }
];

/* sample data - move to a separate file */
const rows = [
  { id: 1, scholarshipName: 'Tulong Dunong Scholarship', startDate: new Date(2023, 12, 9), endDate: new Date(2024, 1, 10), status: "active" }, //actions are not included in the rows.
  { id: 2, scholarshipName: 'Tulong Dunong Scholarship 2', startDate: new Date(2023, 12, 9), endDate: new Date(2024, 1, 10), status: "active" },
  { id: 3, scholarshipName: 'Tulong Dunong Scholarship 3', startDate: new Date(2023, 12, 9), endDate: new Date(2024, 1, 10), status: "active" }
];

export default function DataTable() {
  return ( 
    <div style={{ height: "auto", width: "100%", borderRadius: "16px" }}>
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
            border: 'none'
          },
          '.MuiDataGrid-main': {
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#AFC3D9',
          },
          '.MuiDataGrid-footerContainer': {
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px'
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
          borderRadius: "16px",
          fontFamily: "Outfit",
          fontSize: "20px"
        }}
      />
    </div>
  );
}