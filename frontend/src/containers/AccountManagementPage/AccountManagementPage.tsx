import { Cancel, Delete, Edit, Save } from '@mui/icons-material'
import { Box, IconButton, Modal, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import { PROVIDER_TYPE } from '../../constants/constants'
import { useSnackbar } from '../../context/SnackBarContext'
import { useAppSelector } from '../../redux/store'
import { User } from '../../redux/types'
import { UserRole } from '../SignUpPage/SignUpPage'

dayjs.extend(utc)

/**
 * @interface GridRowDef
 * @description Represents a single row of account data for the DataGrid.
 * @property {number} id - The unique identifier of the account.
 * @property {string} email_address - The email address of the account.
 * @property {string} password - The (hashed) password of the account.
 */
interface GridRowDef {
  id: number
  email_address: string
  password: string
}

/**
 * @interface UserCredentials
 * @description Represents the credentials used to create or update an account.
 * @property {string} email_address - The email address for the account.
 * @property {string} password - The password for the account.
 * @property {number} is_active - Indicates whether the account is active (1) or inactive (0).
 * @property {number | null} parent_id - ID of the parent user (if applicable).
 * @property {UserRole} role - The role assigned to the account.
 */
interface UserCredentials {
  email_address: string
  password: string
  is_active: number
  parent_id: number | null
  role: UserRole
}

/**
 * @typedef Errors
 * @description Represents a collection of error messages keyed by form field names.
 */
type Errors = { [key: string]: string }

/**
 * @function handlePageChange
 * @description Updates the current page number and page size when the DataGrid pagination changes.
 * @param {{ page: number; pageSize: number }} params - An object containing the new page number and page size.
 * @returns {void}
 */
const handlePageChange = (params: { page: number; pageSize: number }): void => {
  // This function will be passed to the DataGrid pagination handler.
  // It should update the state in the component that drives the page index and size.
  // (Note: Actual state update is being handled within the component below.)
}

/**
 * @function handleUserCredentials
 * @description Updates a specific field in the user credentials state.
 * @param {string} inputValue - The new value for the field.
 * @param {string} key - The field name to update.
 * @returns {void}
 */
const handleUserCredentials = (inputValue: string, key: string, setUserCredentials: React.Dispatch<React.SetStateAction<UserCredentials>>, prevCredentials: UserCredentials): void => {
  setUserCredentials({
    ...prevCredentials,
    [key]: inputValue,
  })
}

/**
 * @function handleAddAccount
 * @description Adds a new account after validating the input fields.
 *
 * It attaches the current user's ID as the parent_id and sends a POST request to the API.
 * If validation fails, it shows an error message; otherwise, the new account is added to the DataGrid.
 *
 * @returns {Promise<void>} A promise that resolves when the account creation process is complete.
 */
const AccountManagementPage = () => {
  const { showMessage } = useSnackbar()
  const user = useAppSelector((state) => state.user)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [rowCount, setRowCount] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email_address: '',
    password: '',
    is_active: 1,
    parent_id: null,
    role: PROVIDER_TYPE,
  })
  const [errors, setErrors] = useState<Errors>({
    email_address: '',
    password: '',
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
  ]

  /**
   * @function updateValidationErrors
   * @description Updates the validation error messages based on the current user credentials.
   * It recalculates errors for fields such as email and password.
   * @returns {void}
   */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCredentials, isInitialLoad])

  /**
   * @function handlePageChangeWrapper
   * @description Wrapper for handling page changes in the DataGrid.
   * @param {{ page: number; pageSize: number }} params - The new page and page size.
   * @returns {void}
   */
  const handlePageChangeWrapper = (params: { page: number; pageSize: number }): void => {
    setPage(params.page)
    setPageSize(params.pageSize)
  }

  /**
   * @function handleAddAccount
   * @description Adds a new account by validating the input fields and sending a POST request.
   *
   * It attaches the current user's ID as the parent_id, validates the fields,
   * and updates the DataGrid with the new account on success.
   *
   * @returns {Promise<void>} A promise that resolves when the account creation process is complete.
   */
  const handleAddAccount = async (): Promise<void> => {
    userCredentials.parent_id = user.id as number
    setIsInitialLoad(false)

    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message)
    const hasErrors = errorMessages.length > 0

    if (hasErrors) {
      showMessage('Please fill in the required details.', 'error')
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
        const response = await axiosInstance.post('/api/v1/users', {
          ...userCredentials,
        })

        const data = {
          id: response.data.user.id,
          email_address: response.data.user.email_address,
          password: response.data.user.password_digest,
        }

        setIsModalOpen(false)
        setIsLoading(false)
        setRowData([...rowData, data])
        showMessage(response.data.message, 'success')
      } catch (error: any) {
        setIsLoading(false)
        showMessage(error.response.data.message, 'error')
      }
    }
  }

  /**
   * @function handleEditAccount
   * @description Handles editing an account.
   *
   * It sends a PUT request with the updated data for the selected account.
   * On success, it updates the local DataGrid row data and locks editing mode.
   *
   * @param {GridRenderCellParams} params - The grid cell parameters containing the row data.
   * @returns {Promise<void>} A promise that resolves when the edit operation is complete.
   */
  const handleEditAccount = async (params: GridRenderCellParams): Promise<void> => {
    const data = params.row

    try {
      const response = await axiosInstance.put(`/api/v1/users/${data.id}`, data)
      const newRowData = rowData.map((row) => {
        if (row.id === response.data.user.id) {
          return {
            ...row,
            email_address: response.data.user.email_address,
            password: response.data.user.password_digest,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            birthdate: new Date(response.data.user.birthdate).toDateString(),
          }
        }
        return row
      })
      setIsEditable(false)
      setRowData(newRowData)
      showMessage(response.data.message, 'success')
    } catch (error: any) {
      showMessage(error.response.data.message, 'error')
    }
  }

  /**
   * @function handleDeleteAccount
   * @description Deletes an account by sending a DELETE request to the API.
   *
   * On successful deletion, the account is removed from the DataGrid and a success message is displayed.
   *
   * @param {number} selectedRowId - The ID of the account to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion process is complete.
   */
  const handleDeleteAccount = async (selectedRowId: number): Promise<void> => {
    try {
      const response = await axiosInstance.delete(`/api/v1/users/${selectedRowId}`)
      showMessage(response.data.message, 'success')
      setRowData((prevRowData) => prevRowData.filter((row) => row.id !== selectedRowId))
    } catch (error: any) {
      showMessage(error.response.data.message, 'error')
    }
  }

  /**
   * @function getChildrenAccounts
   * @description Fetches child accounts associated with the current user's ID.
   *
   * It sends a GET request including pagination parameters, and updates the DataGrid with the retrieved accounts.
   *
   * @returns {Promise<void>} A promise that resolves when the fetch process is complete.
   */
  useEffect(() => {
    const getChildrenAccounts = async (): Promise<void> => {
      try {
        setIsDataLoading(true)
        const response = await axiosInstance.get(
          `/api/v1/users/${user.id}?page=${page + 1}&limit=${pageSize}`
        )

        const row = response.data.accounts.map((account: User) => {
          return {
            id: account.id,
            email_address: account.email_address,
            password: account.password_digest,
          }
        })

        setIsDataLoading(false)
        setRowCount(response.data.meta.total_count)
        setRowData(row)
      } catch (error: any) {
        setIsDataLoading(false)
        showMessage(error.response.data.message, 'error')
      }
    }

    getChildrenAccounts()
    // eslint-disable-next-line
  }, [page])

  /**
   * @function renderActions
   * @description Renders the action buttons for each row in the DataGrid.
   *
   * Depending on the editing state, it displays either Save/Cancel buttons or Edit/Delete buttons.
   *
   * @param {GridRenderCellParams} params - The grid cell parameters containing the row data and metadata.
   * @returns {JSX.Element} A JSX element containing the action buttons.
   */
  const renderActions = (params: GridRenderCellParams): JSX.Element => {
    const originalData = [...rowData]
    return isEditable ? (
      <Box>
        <Tooltip title="Save">
          <IconButton
            size="small"
            onClick={() => handleEditAccount(params)}
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
          <IconButton onClick={() => setIsEditable(true)} sx={{ color: '#1F4BEA' }}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              showMessage(
                'Are you sure you want to delete?',
                'warning',
                8000,
                () => handleDeleteAccount(params.row.id)
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

  /**
   * @component AccountManagementPage
   * @description Renders the account management interface.
   *
   * This component allows administrators or providers to manage user accounts,
   * including viewing, adding, editing, and deleting accounts. It displays the accounts in a DataGrid
   * and provides a modal for adding new accounts.
   *
   * @returns {JSX.Element} The rendered AccountManagementPage component.
   */
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
            p: 3,
            overflowY: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <CustomTextfield
            styles={{ padding: '4px', borderRadius: '4px' }}
            label="Email address"
            error={errors.email_address}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleUserCredentials(e.target.value.toLowerCase(), 'email_address', setUserCredentials, userCredentials)
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
              handleUserCredentials(e.target.value, 'password', setUserCredentials, userCredentials)
            }
            value={userCredentials.password}
            placeholder="Input your password"
          />
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
        columns={[
          {
            field: 'email_address',
            headerName: 'Email Address',
            type: 'string',
            editable: false,
            flex: 1.5,
          },
          {
            field: 'password',
            headerName: 'Password',
            type: 'string',
            editable: false,
            flex: 1,
          },
          {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => renderActions(params),
          },
        ]}
        onPaginationModelChange={handlePageChangeWrapper}
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
          borderRadius: '16px',
          fontFamily: 'Outfit',
          fontSize: {
            xs: '12px',
            md: '1rem',
          },
        }}
      />
    </Box>
  )
}

export default AccountManagementPage
