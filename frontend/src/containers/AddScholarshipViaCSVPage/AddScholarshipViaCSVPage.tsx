import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../../axiosConfig'
import { PrimaryButton } from '../../styles/globalStyles'

const AddScholarshipViaCSVPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [successCount, setSuccessCount] = useState<number>(0)
  const [errorsCount, setErrorsCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleDownload = () => {
    const fileUrl = `${process.env.PUBLIC_URL}/files/scholarship_data.xlsx`
    const link = document.createElement('a')
    link.href = fileUrl
    link.setAttribute('download', 'scholarship_data.xlsx')
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files && event.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file) // Ensure that 'file' matches the expected parameter name in your Rails controller
        const response = await axiosInstance.post(
          '/api/v1/scholarships/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        setIsSnackbarOpen(true)
        const { success_count, errors_count, total_count, error } =
          response.data

        if (error) {
          setSuccessMessage('')
          setErrorMessage(`Error uploading file: ${error}`)
        } else {
          setSuccessCount(success_count)
          setErrorsCount(errors_count)
          setTotalCount(total_count)
          setSuccessMessage('File successfully uploaded')
          setErrorMessage('')
        }
      } catch (error) {
        setSuccessMessage('')
        setErrorMessage('Error uploading file')
      }
    } else {
      setIsSnackbarOpen(true)
      setErrorMessage('No file uploaded')
    }
  }

  return (
    <Container
      component="section"
      sx={{
        padding: '20px 10px 50px',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={6000}
        key="topcenter"
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity={successMessage ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage && <Typography>{successMessage}</Typography>}
          {errorMessage && <Typography>{errorMessage}</Typography>}
        </Alert>
      </Snackbar>
      <Box p={'20px 0 40px'}>
        <Link
          href="/provider/dashboard"
          underline="none"
          sx={{
            color: '#F36B3B',
            fontFamily: 'Roboto',
            fontSize: '36px',
            fontWeight: '700',
          }}
        >
          <ArrowBackIosIcon /> Dashboard
        </Link>

        <Typography
          p={'40px 0 30px'}
          sx={{
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '700',
            color: '#002147',
          }}
        >
          Add New Scholarship via CSV
        </Typography>

        <Box
          p={'40px'}
          sx={{
            background: '#AFC3D9',
            borderRadius: '32px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                color: '#686868',
                fontFamily: 'Open Sans',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Upload CSV File
            </Typography>
            <Button variant="text" onClick={handleDownload}>
              <Typography
                sx={{
                  color: '#686868',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileDownloadIcon /> <span>Download scholarship template</span>
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              margin: '20px 0',
              padding: '20px 0',
              borderWidth: '2px',
              borderStyle: 'dashed',
              borderRadius: '16px',
              background: '#fff',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '& input': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              },
            }}
          >
            <input type="file" onChange={handleFileChange} />
            <Typography
              variant="body1"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                color: 'primary.main',
              }}
            >
              <InsertDriveFileIcon />{' '}
              <span>{file ? file.name : 'Upload File'}</span>
            </Typography>
          </Box>
          <PrimaryButton variant="contained" fullWidth onClick={handleUpload}>
            Save Scholarship
          </PrimaryButton>
          <Box display={'flex'} justifyContent={'flex-end'} p={'20px 0 0'}>
            <Typography
              sx={{
                color: 'primary.main',
                marginRight: '10px',
                fontWeight: '700',
              }}
            >
              Count: {totalCount} |
            </Typography>
            <Typography
              color="error"
              sx={{
                marginRight: '10px',
                fontWeight: '700',
              }}
            >
              Error: {errorsCount}
            </Typography>
            <Typography
              sx={{
                color: 'primary.main',
                fontWeight: '700',
              }}
            >
              | Success: {successCount}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default AddScholarshipViaCSVPage
