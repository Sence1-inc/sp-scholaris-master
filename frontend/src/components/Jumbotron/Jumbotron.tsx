import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JumbotronImage from '../../public/images/jumbotron-articles.png'

const Jumbotron = () => {
  const navigate = useNavigate()
  const [searchKey, setSearchKey] = useState<string>('')
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '50px 0',
          width: '80%',
          height: 'inherit',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h3">
          Unlock Your Future with Scholaris: Expert Tips and Resources for
          Finding the Perfect Scholarship!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            width: { xs: '100%', md: '60%' },
          }}
        >
          <TextField
            id="outlined-basic"
            placeholder="Search Article"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            sx={{
              padding: '4px 6px',
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { fontSize: '1rem' },
            }}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ fontSize: '1rem', borderRadius: '20px', lineHeight: '1rem' }}
            onClick={() => navigate(`/articles/search/${searchKey}`)}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box>
        <img
          src={JumbotronImage}
          height="100%"
          width="100%"
          alt="Unlock Your Future with Scholaris"
        />
      </Box>
    </Box>
  )
}

export default Jumbotron
