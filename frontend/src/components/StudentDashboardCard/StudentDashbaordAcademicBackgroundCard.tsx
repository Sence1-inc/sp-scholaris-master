import { Note } from '@mui/icons-material'
import { Box, Typography, useMediaQuery } from '@mui/material'
import theme from '../../styles/theme'
import CustomSmallTextField from '../CustomSmallTextField/CustomSmallTextField'
import StudentDashboardCard from './StudentDashboardCard'

const StudentDashbaordAcademicBackgroundCard = () => {
  const isSm = useMediaQuery(() => theme.breakpoints.down('sm'))

  const handleSave = () => {}
  const handleCancel = () => {}

  return (
    <StudentDashboardCard
      icon={<Note fontSize="small" sx={{ color: 'common.white' }} />}
      title="Academic Background"
      handleCancel={handleCancel}
      handleSave={handleSave}
    >
      <Typography variant="body2">Secondary Education</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <CustomSmallTextField label="School:" fullWidth={isSm} />
        <CustomSmallTextField label="Year:" fullWidth={isSm} />
        <CustomSmallTextField label="Address:" fullWidth={isSm} />
        <CustomSmallTextField label="School Phone:" fullWidth={isSm} />
        <CustomSmallTextField
          label="Awards:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
        <CustomSmallTextField
          label="Organizations:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
      </Box>
      <Typography variant="body2">Elementary Education</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <CustomSmallTextField label="School:" fullWidth={isSm} />
        <CustomSmallTextField label="Year:" fullWidth={isSm} />
        <CustomSmallTextField label="Address:" fullWidth={isSm} />
        <CustomSmallTextField label="School Phone:" fullWidth={isSm} />
        <CustomSmallTextField
          label="Awards:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
        <CustomSmallTextField
          label="Organizations:"
          fullWidth={true}
          multiline={true}
          minRows={6}
        />
      </Box>
    </StudentDashboardCard>
  )
}

export default StudentDashbaordAcademicBackgroundCard
