import { KeyboardArrowDown } from '@mui/icons-material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Link,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import PrimaryButton from '../../components/CustomButton/PrimaryButton'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'

const AddScholarshipViaCSVPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [successCount, setSuccessCount] = useState<number>(0)
  const [errorsCount, setErrorsCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [infoMessage, setInfoMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isUploading, setIsUploading] = useState<boolean>(false)

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
    setIsSnackbarOpen(true)
    setIsUploading(true)
    setInfoMessage('Saving scholarships. Please wait.')
    if (file && file.size > 1024 * 1024) {
      setIsUploading(false)
      setIsSnackbarOpen(true)
      setErrorMessage('The selected file must be 1MB or less')
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
        setIsSnackbarOpen(true)
        const { success_count, errors_count, total_count, results } =
          response.data

        setIsUploading(false)
        setSuccessCount(success_count)
        setErrorsCount(errors_count)
        setTotalCount(total_count)

        const { errors } = results[0]

        if (errors && errors.length > 0 && errorsCount > 0) {
          setSuccessMessage('')
          setErrorMessage(errors.join(', '))
        } else {
          setIsUploading(false)
          setSuccessMessage('File successfully uploaded')
          setErrorMessage('')
        }
      } catch (error) {
        if (error) {
          setIsUploading(false)
          setIsSnackbarOpen(true)
          setSuccessMessage('')
          setErrorMessage('Error uploading file')
        }
      }
    } else {
      setIsUploading(false)
      setIsSnackbarOpen(true)
      setErrorMessage('No file uploaded')
    }
  }

  useEffect(() => {
    if (errorsCount > 0) {
      setSuccessMessage('')
      setErrorMessage(
        `File uploaded successfully but there are ${errorsCount} row/s not saved due to incomplete details`
      )
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
      <CustomSnackbar
        infoMessage={infoMessage}
        successMessage={successMessage}
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
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
          <Box>
            <Accordion
              sx={{
                margin: '0',
                backgroundColor: 'primary.light',
              }}
            >
              <AccordionSummary
                sx={{ margin: '0', color: '#686868' }}
                expandIcon={
                  <KeyboardArrowDown
                    sx={{ color: '#686868' }}
                    fontSize="small"
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography sx={{ margin: '0' }} variant="subtitle1">
                  Open TSV in Excel (Windows)
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ margin: '0' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    1. Open Excel.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    2. Drag and drop the TSV file into the Excel window, or go
                    to File &gt; Open and select the TSV file (ensure the file
                    type is set to "All Files" or "Text Files").
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    3. Select "Delimited" in the Text Import Wizard, then click
                    "Next."
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    4. Check the "Tab" delimiter, then click "Finish."
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                margin: '0',
                backgroundColor: 'primary.light',
              }}
            >
              <AccordionSummary
                sx={{ margin: '0', color: '#686868' }}
                expandIcon={
                  <KeyboardArrowDown
                    sx={{ color: '#686868' }}
                    fontSize="small"
                  />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography sx={{ margin: '0' }} variant="subtitle1">
                  Open TSV in Excel (Mac)
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ margin: '0' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    1. Open Excel.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    2. Drag and drop the TSV file into the Excel window, or go
                    to File &gt; Open... and select the TSV file (ensure the
                    file type is set to "All Files" or "Text Files").
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    3. Select "Delimited" in the Text Import Wizard, then click
                    "Next."
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    4. Check the "Tab" delimiter, then click "Finish."
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                margin: '0',
                backgroundColor: 'primary.light',
              }}
            >
              <AccordionSummary
                sx={{ margin: '0', color: '#686868' }}
                expandIcon={
                  <KeyboardArrowDown
                    sx={{ color: '#686868' }}
                    fontSize="small"
                  />
                }
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography sx={{ margin: '0' }} variant="subtitle1">
                  Open TSV in Google Sheets
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ margin: '0' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    1. Open Google Sheets.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    2. Create a new spreadsheet.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    3. Drag and drop the TSV file into the browser window, or go
                    to File &gt; Import &gt; Upload and select the TSV file.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    4. Ensure "Separator type" is set to "Tab" and click "Import
                    Data."
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                margin: '0',
                backgroundColor: 'primary.light',
              }}
            >
              <AccordionSummary
                sx={{ margin: '0', color: '#686868' }}
                expandIcon={
                  <KeyboardArrowDown
                    sx={{ color: '#686868' }}
                    fontSize="small"
                  />
                }
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography sx={{ margin: '0' }} variant="subtitle1">
                  Open TSV in Numbers (Mac)
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ margin: '0' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    1. Open Numbers.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    2. Drag and drop the TSV file into the Numbers window, or go
                    to File &gt; Open... and select the TSV file.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    3. Review and confirm import settings.
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#686868' }}>
                    4. Click "Open."
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
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
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#686868' }}>
              Please ensure the following steps are taken when addressing
              errors: <br />
              1. DO NOT remove the second row. <br />
              2. Ensure adherence to the correct format, particularly for the
              start date and due date. <br />
              3. Ensure that the status' value is "active" or "inactive". <br />
              4. Ensure that there are no duplicated scholarship. <br />
              5. Complete all columns with relevant details.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default AddScholarshipViaCSVPage
