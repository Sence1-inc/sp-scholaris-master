import { Delete, Edit, Visibility } from '@mui/icons-material'
import { Box, IconButton, Modal, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import HelperText from '../../components/HelperText/HelperText'
import { PROVIDER_TYPE } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { User } from '../../redux/types'
import { Errors } from '../SignUpPage/SignUpPage'

interface GridRowDef {
  id: number
  emailAddress: string
  password: string
  firstName: string
  lastName: string
  birthdate: Dayjs | Date | string | null
}

interface UserCredentials {
  email_address: string
  password: string
  first_name: string
  last_name: string
  birthdate: Dayjs | Date | string | null
  is_active: number
  parent_id: number | null
  role: string
}

const AccountManagementPage = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const dispatch = useAppDispatch()
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number>(0)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [rowCount, setRowCount] = useState<number>(0)
  const [children, setChildren] = useState<User[] | []>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email_address: '',
    password: '',
    first_name: '',
    last_name: '',
    birthdate: null,
    is_active: 1,
    parent_id: null,
    role: PROVIDER_TYPE,
  })
  const [errors, setErrors] = useState<Errors>({
    email_address: '',
    password: '',
    first_name: '',
    last_name: '',
    birthdate: '',
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailRegex.test(userCredentials.email_address)
  const isPasswordValid = userCredentials.password.length > 6

  const validationConditions = [
    {
      condition: !isValidEmail || !userCredentials.email_address,
      field: 'email_address',
      message: 'Please provide a valid email address.',
    },
    {
      condition: !isPasswordValid || !userCredentials.password,
      field: 'password',
      message: 'Password must be at least 6 characters.',
    },
    {
      condition: !userCredentials.first_name,
      field: 'first_name',
      message: 'Please provide your first name.',
    },
    {
      condition: !userCredentials.last_name,
      field: 'last_name',
      message: 'Please provide your last name.',
    },
    {
      condition:
        !userCredentials.birthdate ||
        isNaN(new Date(userCredentials.birthdate as string).getTime()) ||
        new Date(userCredentials.birthdate as string) > new Date() ||
        new Date(userCredentials.birthdate as string) < new Date('1920-01-01'),
      field: 'birthdate',
      message: 'Please provide your valid birthday.',
    },
  ]

  useEffect(() => {
    if (!isInitialLoad) {
      const errorMessages: any = validationConditions
        .filter(({ condition }) => condition)
        .reduce((acc: any, item) => {
          acc[item.field] = item.message
          return acc
        }, {})
      setErrors(errorMessages)
    }
    // eslint-disable-next-line
  }, [userCredentials, isInitialLoad])

  const columns = [
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      type: 'string',
      editable: true,
      flex: 1,
    },
    {
      field: 'password',
      headerName: 'Password',
      type: 'string',
      editable: true,
      flex: 1,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      type: 'string',
      editable: true,
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      type: 'string',
      editable: true,
      flex: 1,
    },
    {
      field: 'birthdate',
      headerName: 'Birthdate',
      type: 'string',
      editable: true,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      renderCell: (params: any) => renderActions(params),
    },
  ]

  const handlePageChange = (params: { page: number; pageSize: number }) => {
    setPage(params.page)
    setPageSize(params.pageSize)
  }

  const handleUserCredentials = (inputValue: string, key: string) => {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      [key]: inputValue,
    }))
  }

  const handleAddAccount = async () => {
    userCredentials.parent_id = user.id as number
    setIsInitialLoad(false)

    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message)
    const hasErrors = errorMessages.length > 0

    if (hasErrors) {
      setSuccessMessage('')
      setIsSnackbarOpen(true)
      setErrorMessage('Please fill in the required details.')
      const newErrors = validationConditions.reduce<{ [key: string]: string }>(
        (acc, { condition, field, message }) => {
          if (condition) {
            acc[field] = message
          }
          return acc
        },
        {}
      )

      setErrors({ ...errors, ...newErrors })
    } else {
      try {
        setIsLoading(true)
        const response = await axiosInstance.post(
          '/api/v1/users',
          userCredentials
        )
        setIsLoading(false)
        console.log(response)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const getChildren = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/users/${user.id}`)
        const row = data.map((account: User) => {
          return {
            id: account.id,
            emailAddress: account.email_address,
            password: account.password_digest,
            firstName: account.first_name,
            lastName: account.last_name,
            birthdate: new Date(account.birthdate).toDateString(),
          }
        })

        setRowData(row)
      } catch (error: any) {
        setErrorMessage(error.response.data.message)
      }
    }

    getChildren()
  }, [])

  const renderActions = (params: any) => {
    return (
      <Box>
        <Tooltip title="View">
          <IconButton
            onClick={() => navigate(`/scholarships/${params.row.id}`)}
            sx={{ color: '#06A5FF' }}
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => setIsModalOpen(true)}
            sx={{ color: '#1F4BEA' }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              setWarningMessage('Are you sure you want to delete?')
              setSelectedRow(params.row.id)
              setIsSnackbarOpen(true)
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
        gap: '20px',
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
          Accounts Management
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            justifyContent: 'space-between',
            columnGap: '20px',
            rowGap: '20px',
            width: {
              xs: '100%',
              sm: 'auto',
            },
          }}
        >
          <CTAButton
            handleClick={() => setIsModalOpen(true)}
            label="Add Account"
            loading={false}
          />
        </Box>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: '80vw',
            height: 'auto',
            bgcolor: 'background.paper',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            p: 3, // Padding inside the modal
            overflowY: 'auto', // Enable vertical scrolling
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the modal
            boxShadow: 24,
            borderRadius: 2, // Optional: add rounded corners
          }}
        >
          <CustomTextfield
            styles={{ padding: '4px', borderRadius: '4px' }}
            label="Email address"
            error={errors.email_address}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUserCredentials(
                e.target.value.toLowerCase(),
                'email_address'
              )
            }
            value={userCredentials.email_address.toLowerCase()}
            placeholder="Input your email"
          />
          <CustomTextfield
            styles={{ padding: '4px', borderRadius: '4px' }}
            type="password"
            label="Password"
            error={errors.password}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUserCredentials(e.target.value, 'password')
            }
            value={userCredentials.password}
            placeholder="Input your password"
          />
          <CustomTextfield
            styles={{ padding: '4px', borderRadius: '4px' }}
            label="First name"
            error={errors.first_name}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUserCredentials(e.target.value, 'first_name')
            }
            value={userCredentials.first_name}
            placeholder="Input your first name"
          />
          <CustomTextfield
            styles={{ padding: '4px', borderRadius: '4px' }}
            label="Last name"
            error={errors.last_name}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUserCredentials(e.target.value, 'last_name')
            }
            value={userCredentials.last_name}
            placeholder="Input your last name"
          />
          <Box>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '700',
                color: '#002147',
              }}
            >
              Birthdate
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(date) =>
                  handleUserCredentials(date?.toString() as string, 'birthdate')
                }
                value={
                  userCredentials.birthdate === null
                    ? null
                    : dayjs(userCredentials.birthdate)
                }
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    sx: {
                      borderColor: errors.birthdate ? 'red' : '',
                      padding: '4px',
                      borderRadius: '4px',
                    },
                  },
                }}
              />
              <HelperText error={errors.birthdate ? errors.birthdate : ''} />
            </LocalizationProvider>
          </Box>
          <CTAButton
            handleClick={handleAddAccount}
            label="Save"
            loading={isLoading}
            styles={{ padding: '10px', height: 'auto' }}
          />
        </Box>
      </Modal>
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
        loading={isDataLoading}
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
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'secondary.main',
          },
        }}
      />
    </Box>
  )
}

export default AccountManagementPage
