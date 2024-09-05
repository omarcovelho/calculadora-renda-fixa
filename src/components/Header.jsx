import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Header = () => {
  return (
    <AppBar position="static">
        <Toolbar>
            <MonetizationOnIcon sx={{ mr: 2 }} /> 
            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Calculadora Renda Fixa
            </Typography>
            <Button color="inherit" component={Link} to="/comparador">Comparador</Button>
            <Button color="inherit" component={Link} to="/simulador">Simulador</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Header