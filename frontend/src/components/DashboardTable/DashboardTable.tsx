import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'scholarshipName', headerName: 'Scholarship Name', width: 130 },
  { field: 'startDate', headerName: 'Start Date', type: "date", width: 130 },
  { field: 'endDate', headerName: 'End Date', type: "date", width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'actions', headerName: 'Actions', type: "actions", width: 130,
  getActions: (params) => [
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={deleteUser(params.id)}
    />,
    <GridActionsCellItem
      icon={<SecurityIcon />}
      label="Toggle Admin"
      onClick={toggleAdmin(params.id)}
      showInMenu
    />,
    <GridActionsCellItem
      icon={<FileCopyIcon />}
      label="Duplicate User"
      onClick={duplicateUser(params.id)}
      showInMenu
    />
  ]
  }
];

/* sample data - move to a separate file */
const rows = [
  { id: 1, scholarshipName: 'Tulong Dunong Scholarship', startDate: new Date(2023, 12, 9), endDate: new Date(2024, 1, 10), status: "active", },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
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
      />
    </div>
  );
}