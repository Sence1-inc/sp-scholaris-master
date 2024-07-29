import {
  Box,
  Button,
  Collapse,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React from 'react'
import theme from '../../styles/theme'

const OpenTsvInstructions = () => {
  const [open, setOpen] = React.useState(false)
  const isSm = useMediaQuery(() => theme.breakpoints.down('sm'))

  const toggleCollapse = () => {
    setOpen((prev) => !prev)
  }

  const instructions = [
    {
      title: 'Excel',
      steps: [
        'Open Excel.',
        "Drag and drop the TSV file into the Excel window, or go to File > Open and select the TSV file (ensure the file type is set to 'All Files' or 'Text Files').",
        "In the Text Import Wizard, select 'Delimited', then click 'Next'.",
        "Check the 'Tab' delimiter, then click 'Finish'.",
      ],
    },
    {
      title: 'Google Sheets',
      steps: [
        'Open Google Sheets and create a new spreadsheet.',
        'Drag and drop the TSV file into the browser window, or go to File > Import > Upload and select the TSV file.',
        "Ensure the 'Separator type' is set to 'Tab' and click 'Import Data'.",
      ],
    },
    {
      title: 'Numbers',
      steps: [
        'Open Numbers.',
        'Drag and drop the TSV file into the Numbers window, or go to File > Open... and select the TSV file.',
        'Review and confirm the import settings.',
        "Click 'Open'.",
      ],
    },
  ]

  return (
    <Box sx={{ margin: '30px 0' }}>
      {isSm && (
        <Button color="secondary" variant="text" onClick={toggleCollapse}>
          {open ? 'Hide Instructions' : 'How to Open TSV?'}
        </Button>
      )}
      <Collapse in={isSm ? open : true}>
        <Grid container spacing={2}>
          {instructions.map((instruction, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                elevation={2}
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                <Typography variant="body1" color="white">
                  {instruction.title}
                </Typography>
                <Typography variant="subtitle1" color="white">
                  {instruction.steps.map((step, stepIndex) => (
                    <Typography
                      key={stepIndex}
                      variant="subtitle1"
                      color="white"
                    >
                      {stepIndex + 1}. {step}
                    </Typography>
                  ))}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Box>
  )
}

export default OpenTsvInstructions
