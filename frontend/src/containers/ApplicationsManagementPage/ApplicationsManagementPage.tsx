import { Cancel, Delete, Edit, Save } from '@mui/icons-material'
import { Box, IconButton, Modal, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import HelperText from '../../components/HelperText/HelperText'
import { PROVIDER_TYPE } from '../../constants/constants'
import { useSnackbar } from '../../context/SnackBarContext'
import { useAppSelector } from '../../redux/store'
import { ScholarshipApplication, User } from '../../redux/types'
import { Errors } from '../SignUpPage/SignUpPage'

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
  notes: string
}

// interface UserCredentials {
//   email_address: string
//   password: string
//   first_name: string
//   last_name: string
//   birthdate: Dayjs | Date | string | null
//   is_active: number
//   parent_id: number | null
//   role: string
// }

const ApplicationsManagementPage = () => {
  const { showMessage } = useSnackbar()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [rowCount, setRowCount] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
  // const [userCredentials, setUserCredentials] = useState<UserCredentials>({
  //   email_address: '',
  //   password: '',
  //   first_name: '',
  //   last_name: '',
  //   birthdate: null,
  //   is_active: 1,
  //   parent_id: null,
  //   role: PROVIDER_TYPE,
  // })
  // const [errors, setErrors] = useState<Errors>({
  //   email_address: '',
  //   password: '',
  //   first_name: '',
  //   last_name: '',
  //   birthdate: '',
  // })

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // const isValidEmail = emailRegex.test(userCredentials.email_address)
  // const isPasswordValid = userCredentials.password.length > 6

  // const validationConditions = [
  //   {
  //     condition: !isValidEmail || !userCredentials.email_address,
  //     field: 'email_address',
  //     message: 'Please provide a valid email address.',
  //   },
  //   {
  //     condition: !isPasswordValid || !userCredentials.password,
  //     field: 'password',
  //     message: 'Password must be at least 6 characters.',
  //   },
  //   {
  //     condition: !userCredentials.first_name,
  //     field: 'first_name',
  //     message: 'Please provide your first name.',
  //   },
  //   {
  //     condition: !userCredentials.last_name,
  //     field: 'last_name',
  //     message: 'Please provide your last name.',
  //   },
  //   {
  //     condition:
  //       !userCredentials.birthdate ||
  //       isNaN(new Date(userCredentials.birthdate as string).getTime()) ||
  //       new Date(userCredentials.birthdate as string) > new Date() ||
  //       new Date(userCredentials.birthdate as string) < new Date('1920-01-01'),
  //     field: 'birthdate',
  //     message: 'Please provide your valid birthday.',
  //   },
  // ]

  // useEffect(() => {
  //   if (!isInitialLoad) {
  //     const errorMessages: any = validationConditions
  //       .filter(({ condition }) => condition)
  //       .reduce((acc: any, item) => {
  //         acc[item.field] = item.message
  //         return acc
  //       }, {})
  //     setErrors(errorMessages)
  //   }
  //   // eslint-disable-next-line
  // }, [userCredentials, isInitialLoad])

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
      field: 'application_date',
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
      editable: isEditable,
      flex: 0.5,
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      type: 'string',
      editable: false,
      flex: 0.5,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      type: 'string',
      editable: isEditable,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => renderActions(params),
    },
  ]

  const handlePageChange = (params: { page: number; pageSize: number }) => {
    setPage(params.page)
    setPageSize(params.pageSize)
  }

  // const handleUserCredentials = (inputValue: string, key: string) => {
  //   setUserCredentials((prevUserCredentials) => ({
  //     ...prevUserCredentials,
  //     [key]: inputValue,
  //   }))
  // }

  // const handleAddAccount = async () => {
  //   userCredentials.parent_id = user.id as number
  //   setIsInitialLoad(false)

  //   const errorMessages = validationConditions
  //     .filter(({ condition }) => condition)
  //     .map(({ message }) => message)
  //   const hasErrors = errorMessages.length > 0

  //   if (hasErrors) {
  //     showMessage('Please fill in the required details.', 'error')

  //     const newErrors = validationConditions.reduce<{ [key: string]: string }>(
  //       (acc, { condition, field, message }) => {
  //         if (condition) {
  //           acc[field] = message
  //         }
  //         return acc
  //       },
  //       {}
  //     )

  //     setErrors({ ...errors, ...newErrors })
  //   } else {
  //     try {
  //       setIsLoading(true)
  //       const response = await axiosInstance.post('/api/v1/users', {
  //         ...userCredentials,
  //         birthdate: dayjs(userCredentials.birthdate).utc().format(),
  //       })

  //       const data = {
  //         // id: response.data.user.id,
  //         // email_address: response.data.user.email_address,
  //         // password: response.data.user.password_digest,
  //         // first_name: response.data.user.first_name,
  //         // last_name: response.data.user.last_name,
  //         // birthdate: new Date(response.data.user.birthdate).toDateString(),
  //         scholarship_id: response.data.scholarship_id
  // scholarship_name: string
  // student_name: string
  // application_date: Dayjs | Date | string | null
  // email_address: string
  // status: string
  // updated_at: Dayjs | Date | string | null
  // notes: string
  //       }

  //       setIsModalOpen(false)
  //       setIsLoading(false)
  //       setIsModalOpen(false)
  //       setRowData([...rowData, data])
  //       showMessage(response.data.message, 'success')
  //     } catch (error: any) {
  //       setIsLoading(false)
  //       showMessage(error.response.data.message, 'error')
  //     }
  //   }
  // }

  // const handleEditAccount = async (params: GridRenderCellParams) => {
  //   const data = params.row

  //   try {
  //     const response = await axiosInstance.put(`/api/v1/users/${data.id}`, data)

  //     const newRowData = rowData.map((row) => {
  //       if (row.id === response.data.user.id) {
  //         return {
  //           ...row,
  //           email_address: response.data.user.email_address,
  //           password: response.data.user.password_digest,
  //           first_name: response.data.user.first_name,
  //           last_name: response.data.user.last_name,
  //           birthdate: new Date(response.data.user.birthdate).toDateString(),
  //         }
  //       }

  //       return row
  //     })
  //     setIsEditable(false)
  //     setRowData(newRowData)
  //     showMessage(response.data.message, 'success')
  //   } catch (error: any) {
  //     showMessage(error.response.data.message, 'error')
  //   }
  // }

  // const handleDeleteAccount = async (selectedRowId: number) => {
  //   try {
  //     const response = await axiosInstance.delete(
  //       `/api/v1/users/${selectedRowId}`
  //     )
  //     showMessage(response.data.message, 'success')
  //     setRowData((prevRowData) =>
  //       prevRowData.filter((row) => row.id !== selectedRowId)
  //     )
  //   } catch (error: any) {
  //     showMessage(error.response.data.message, 'error')
  //   }
  // }

  useEffect(() => {
    const getChildren = async () => {
      try {
        setIsDataLoading(true)
        const response = await axiosInstance.get(
          `/api/v1/scholarship_providers/${user.scholarship_provider.id}/scholarship_applications?page=${page + 1}&limit=${pageSize}`
        )

        const row = response.data.scholarship_applications.map(
          (scholarship_application: ScholarshipApplication) => {
            return {
              id: scholarship_application.id,
              scholarship_id: scholarship_application.scholarship_id,
              scholarship_name: scholarship_application.scholarship_name,
              student_name: scholarship_application.student_name,
              application_date: new Date(
                scholarship_application.application_date
              ).toDateString(),
              student_email: scholarship_application.student_email,
              status: scholarship_application.status,
              updated_at: new Date(
                scholarship_application.updated_at
              ).toDateString(),
              notes: scholarship_application.notes,
            }
          }
        )

        setIsDataLoading(false)
        setRowCount(response.data.total_count)
        setRowData(row)
      } catch (error: any) {
        setIsDataLoading(false)
        showMessage(error.response.data.message, 'error')
      }
    }

    getChildren()
    // eslint-disable-next-line
  }, [])

  const renderActions = (params: GridRenderCellParams) => {
    const originalData = [...rowData]
    return isEditable ? (
      <Box>
        <Tooltip title="Save">
          <IconButton
            size="small"
            // onClick={() => handleEditAccount(params)}
            sx={{ color: '#06A5FF' }}
          >
            <Save />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <IconButton
            size="small"
            onClick={() => {
              setIsEditable(false)
              setRowData(originalData)
            }}
            sx={{ color: '#F50F0F' }}
          >
            <Cancel />
          </IconButton>
        </Tooltip>
      </Box>
    ) : (
      <Box>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => setIsEditable(true)}
            sx={{ color: '#1F4BEA' }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              showMessage(
                'Are you sure you want to delete?',
                'warning',
                8000
                // () => handleDeleteAccount(params.row.id)
              )
            }}
            sx={{ color: '#F50F0F' }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }

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

export default ApplicationsManagementPage
