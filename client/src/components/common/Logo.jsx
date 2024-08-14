import { Typography, useTheme } from '@mui/material'
import React from 'react'

const Logo = () => {
    const theme = useTheme();
  return (
    <Typography fontWeight="700" fontSize="1.7rem">
        Reel<span style={{color: theme.palette.primary.main}}>Vault</span>
    </Typography>
  )
}

export default Logo