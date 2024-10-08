import { Circle } from '@mui/icons-material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import {
  Box,
  Button,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import PrimaryButton from '../../components/CustomButton/PrimaryButton'
import OpenTsvInstructions from '../../components/Instructions/OpenTsvInstructions'
import { useSnackbar } from '../../context/SnackBarContext';

const AddScholarshipViaCSVPage: React.FC = () => {
  const { showMessage } = useSnackbar();
  const [file, setFile] = useState<File | null>(null)
  const [successCount, setSuccessCount] = useState<number>(0)
  const [errorsCount, setErrorsCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const instructions = [
    'DO NOT remove the first and second row.',
    'Ensure adherence to the correct format, particularly for the start date and due date.',
    "Ensure that the status' value is 'active' or 'inactive'.",
    'Ensure that there are no duplicated scholarship.',
    'Complete all columns with relevant details.',
  ]

  const handleDownload = () => {
    const fileUrl = `${process.env.PUBLIC_URL}/files/scholarship_data.tsv`
    const link = document.createElement('a')
    link.href = fileUrl
    link.setAttribute('download', 'scholarship_data.tsv')
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
    showMessage('Saving scholarships. Please wait.', 'info')
    if (file && file.size > 1024 * 1024) {
      setIsUploading(false)
      showMessage('The selected file must be 1MB or less', 'error')
    } else if (file && file.size < 1024 * 1024) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axiosInstance.post(
          '/api/v1/scholarships/upload',
          formData,
          {
            withCredentials: true,
            timeout: 100000,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        const { success_count, errors_count, total_count, results } =
          response.data

        setIsUploading(false)
        setSuccessCount(success_count)
        setErrorsCount(errors_count)
        setTotalCount(total_count)

        const { errors } = results[0]
        if (errors && errors.length > 0 && errorsCount > 0) {
          showMessage(errors.join(', '), 'error')
        } else {
          setIsUploading(false)
          showMessage('File successfully uploaded', 'success')
        }
      } catch (error) {
        if (error) {
          setIsUploading(false)
          showMessage('Error uploading file', 'error')
        }
      }
    } else {
      setIsUploading(false)
      showMessage('No file uploaded', 'error')
    }
  }

  useEffect(() => {
    if (errorsCount > 0) {
      showMessage(`File uploaded successfully but there are ${errorsCount} row/s not saved due to incomplete details`, 'error')
    }
    // eslint-disable-next-line
  }, [errorsCount])

  return (
    <Container
      component="section"
      sx={{
        padding: '20px 10px 50px',
      }}
    >
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
          Add New Scholarship via TSV
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
              Upload TSV File
            </Typography>
            <Button
              variant="text"
              onClick={handleDownload}
              id="download-template"
            >
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
            <input
              type="file"
              onChange={handleFileChange}
              disabled={isUploading}
            />
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
          <PrimaryButton
            id="save-scholarship-via-file"
            handleClick={handleUpload}
            label="Save Scholarship"
            loading={isUploading}
          />
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
          <OpenTsvInstructions />
          <Box>
            <Typography variant="body1" color="primary">
              Please ensure the following steps are taken when addressing
              errors:
            </Typography>
            <List sx={{ color: 'primary' }}>
              {instructions.map((instruction) => {
                return (
                  <ListItem>
                    <ListItemIcon>
                      <Circle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ fontSize: '8px' }}>
                      {instruction}
                    </ListItemText>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default AddScholarshipViaCSVPage
