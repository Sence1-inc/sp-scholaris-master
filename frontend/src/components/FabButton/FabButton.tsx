import { Fab } from '@mui/material'
import React from 'react'

interface FabButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon: React.ReactNode
  text: string
}

const FabButton: React.FC<FabButtonProps> = ({ handleClick, icon, text }) => {
  return (
    <Fab
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
      {icon}
      {text}
    </Fab>
  )
}

export default FabButton
