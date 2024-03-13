import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'scholarshipName', headerName: 'Scholarship Name', width: 130 },
  { field: 'startDate', headerName: 'Start Date', type: "date", width: 130 },
  { field: 'endDate', headerName: 'End Date', type: "date", width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'actions', headerName: 'Actions', type: "actions", width: 130,
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
  { id: 1, scholarshipName: 'Tulong Dunong Scholarship 2', startDate: new Date(2023, 12, 9), endDate: new Date(2024, 1, 10), status: "active" },
  { id: 1, scholarshipName: 'Tulong Dunong Scholarship 3', startDate: new Date(2023, 12, 9), endDate: new Date(2024, 1, 10), status: "active" }
];

export default function DataTable() {
  return ( 
    <div style={{ height: 400, width: '100%' }}>
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
          borderRadius: "16px",
          fontFamily: "Outfit",
          fontSize: "20px"
        }}
      />
    </div>
  );
}