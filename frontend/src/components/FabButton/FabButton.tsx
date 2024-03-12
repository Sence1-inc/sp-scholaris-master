import { Fab, useTheme } from '@mui/material'
import React from 'react'
import './FabButton.css'

interface FabButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon: React.ReactNode
  text: string
}

const FabButton: React.FC<FabButtonProps> = ({ handleClick, icon, text }) => {
  const theme = useTheme()
  return (
    <Fab
      className="fab"
      onClick={handleClick}
      variant="extended"
      sx={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: 'var(--secondary-color)',
        color: 'white',
        padding: '20px',
        '&:hover': {
          backgroundColor: 'var(--primary-color)',
        },
      }}
    >
      {icon} {window.innerWidth > theme.breakpoints.values.sm && text}
    </Fab>
  )
}

export default FabButton
