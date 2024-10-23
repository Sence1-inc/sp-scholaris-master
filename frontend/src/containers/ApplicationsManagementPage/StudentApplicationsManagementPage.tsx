import { Box, Typography } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import { APPLICATION_STATUSES } from '../../constants/constants'
import { useSnackbar } from '../../context/SnackBarContext'
import { useAppSelector } from '../../redux/store'
import { ScholarshipApplication } from '../../redux/types'

dayjs.extend(utc)

interface GridRowDef {
  id: number
  scholarship_id: number
  scholarship_name: string
  student_name: string
  application_date: Dayjs | Date | string | null
  student_email: string
  status: string
  updated_at: Dayjs | Date | string | null
}

const StudentApplicationsManagementPage = () => {
  const { showMessage } = useSnackbar()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: number]: number
  } | null>(null)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [rowCount, setRowCount] = useState<number>(0)

  const columns = [
    {
      field: 'scholarship_id',
      headerName: 'Scholarship ID',
      type: 'number',
      editable: false,
      flex: 0.5,
    },
    {
      field: 'scholarship_name',
      headerName: 'Scholarship Name',
      type: 'string',
      editable: false,
      flex: 1.5,
    },
    {
      field: 'student_name',
      headerName: 'Student Name',
      type: 'string',
      editable: false,
      flex: 1.5,
    },
    {
      field: 'created_at',
      headerName: 'Application Date',
      type: 'string',
      editable: false,
      flex: 1,
    },
    {
      field: 'student_email',
      headerName: 'Email Address',
      type: 'string',
      editable: false,
      flex: 0.5,
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'string',
      editable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => renderStatus(params),
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      type: 'string',
      editable: false,
      flex: 0.5,
    },
  ]

  const handlePageChange = (params: { page: number; pageSize: number }) => {
    setPage(params.page)
    setPageSize(params.pageSize)
  }

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const renderStatus = (params: GridRenderCellParams) => {
    return formatStatus(
      APPLICATION_STATUSES[selectedStatus?.[Number(params.id)] as number]
    )
  }

  useEffect(() => {
    const getApplications = async () => {
      try {
        setIsDataLoading(true)
        const response = await axiosInstance.get(
          `/api/v1/users/${user.id}/scholarship_applications?page=${page + 1}&limit=${pageSize}`
        )

        console.log(response)
        const row = response.data.scholarship_applications.map(
          (scholarship_application: ScholarshipApplication) => {
            return {
              id: scholarship_application.id,
              scholarship_id: scholarship_application.scholarship_id,
              scholarship_name:
                scholarship_application.scholarship.scholarship_name,
              student_name: `${scholarship_application.user ? scholarship_application.user?.first_name : 'No student account'} ${scholarship_application.user ? scholarship_application.user?.last_name : ''}`,
              created_at: new Date(
                scholarship_application.created_at
              ).toDateString(),
              student_email: scholarship_application.student_email,
              status: scholarship_application.status,
              updated_at: new Date(
                scholarship_application.updated_at
              ).toDateString(),
            }
          }
        )

        const statuses = response.data.scholarship_applications.reduce(
          (
            acc: { [key: number]: number },
            scholarship_application: ScholarshipApplication
          ) => {
            acc[Number(scholarship_application.id)] =
              scholarship_application.status
            return acc
          },
          {}
        )

        setSelectedStatus(statuses)
        setIsDataLoading(false)
        setRowCount(response.data.total_count)
        setRowData(row)
      } catch (error: any) {
        setIsDataLoading(false)
        showMessage(error.response.data.message, 'error')
      }
    }

    getApplications()
    // eslint-disable-next-line
  }, [])

  return (
    <Box
      sx={{
        padding: {
          xs: '100px 20px',
          md: '100px 74px',
        },
        display: 'flex',
        flexDirection: 'column',
        rowGap: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'flex-start',
          rowGap: '20px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Roboto',
            fontWeight: '700',
            letterSpacing: '0px',
            fontSize: '2.5rem',
            display: 'flex',
            alignSelf: {
              xs: 'flex-start',
              md: 'flex-end',
            },
          }}
        >
          Applications Management
        </Typography>
      </Box>
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
        pageSizeOptions={[10]}
        pagination
        paginationMode="server"
        loading={isDataLoading}
        disableRowSelectionOnClick
        sx={{
          width: '100%',
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
          '@keyframes blink': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          '& .MuiDataGrid-overlay': {
            zIndex: '20',
          },
          '.MuiDataGrid-overlayWrapper': {
            minHeight: '200px',
            height: rowData.length > 0 ? 'auto !important' : '200px !important',
          },
          '.MuiDataGrid-overlayWrapperInner': {
            minHeight: '200px',
            height: rowData.length > 0 ? 'auto !important' : '200px !important',
          },
          borderRadius: '16px',
          fontFamily: 'Outfit',
          fontSize: {
            xs: '12px',
            md: '1rem',
          },
          // '& .MuiDataGrid-row:hover': {
          //   backgroundColor: 'secondary.main',
          // },
        }}
      />
    </Box>
  )
}

export default StudentApplicationsManagementPage
