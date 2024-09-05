import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom'; // Ensure you have React Router set up

// Custom LinkTab component to integrate Tab with React Router's Link
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Header = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname); // Track the current path for active tab

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the state when the tab changes
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Title aligned to the left in the AppBar */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left', pl: 2 }}>
          Calculadora Renda Fixa
        </Typography>
      </Toolbar>
      {/* Tabs component for navigation, taking the full width below the title */}
      <Box sx={{ width: '100%' }}> {/* Full width for the tabs */}
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit" // Ensure tabs inherit text color from AppBar
          indicatorColor="secondary" // Use the secondary color for the active tab indicator
          sx={{
            '& .MuiTab-root': { color: 'rgba(255, 255, 255, 0.7)' }, // Unselected tab text color
            '& .Mui-selected': { color: 'white' }, // Selected tab text color
            '& .MuiTabs-indicator': { backgroundColor: 'white' }, // Selected tab underline color
          }}
          variant="fullWidth" // Make tabs take full width
        >
          <LinkTab label="Comparador" to="/comparador" value="/comparador" />
          <LinkTab label="Simulador" to="/simulador" value="/simulador" />
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default Header;
