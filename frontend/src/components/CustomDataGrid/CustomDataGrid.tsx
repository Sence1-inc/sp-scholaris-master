import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface CustomDataGridProps {
  rows: any[]
  rowCount: number
  columns: GridColDef[]
  isDataLoading: boolean
  page: number
  pageSize: number
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void
  isEditable?: boolean
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  rows,
  rowCount,
  columns,
  isDataLoading,
  page,
  pageSize,
  onPaginationModelChange,
  isEditable = false,
}) => {
  return (
    <DataGrid
      localeText={{ noRowsLabel: 'No saved data' }}
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      paginationMode="server"
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={[10]}
      pagination
      loading={isDataLoading}
      disableRowSelectionOnClick
      sx={{
        width: '100%',
        height: Array.isArray(rows) && rows?.length > 0 ? 'auto' : 200,
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
          backgroundColor: '#AFC3D9',
        },
        '& .MuiDataGrid-row': {
          '&:nth-of-type(odd)': {
            backgroundColor: isEditable ? '#fff' : '#D8D8D8',
          },
          '&:nth-of-type(even)': {
            backgroundColor: isEditable ? '#fff' : '#F1F1F1',
          },
          '& .MuiDataGrid-cell': {
            position: 'relative',
            padding: '10px',
          },
          '&.MuiDataGrid-cell--editing': {
            '&::after': {
              content: 'none',
            },
          },
        },
        '.MuiDataGrid-overlayWrapper': {
          minHeight: '200px',
          height: rows?.length > 0 ? 'auto !important' : '200px !important',
        },
        '.MuiDataGrid-overlayWrapperInner': {
          minHeight: '200px',
          height: rows?.length > 0 ? 'auto !important' : '200px !important',
        },
        '@keyframes blink': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        '& .MuiDataGrid-overlay': {
          zIndex: '20',
        },
        borderRadius: '16px',
        fontFamily: 'Outfit',
        fontSize: {
          xs: '12px',
          md: '1rem',
        },
      }}
    />
  )
}

export default CustomDataGrid
