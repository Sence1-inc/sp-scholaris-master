import { IconButton, Paper, Popover } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'

interface FloatingElementProps {
  children: React.ReactNode
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  anchorEl,
  handleClose,
}) => {
  const isOpen = Boolean(anchorEl)
  const id = isOpen ? 'floating-paper' : undefined
  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Paper
        sx={{
          padding: '40px',
          width: '50vw',
          overflowY: 'hidden',
          maxHeight: '94vh',
        }}
      >
        <IconButton
          aria-label="close"
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={handleClose}
        >
          <ClearIcon />
        </IconButton>
        {children}
      </Paper>
    </Popover>
  )
}

export default FloatingElement
