import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SubAdminSidebar from './SubAdminSidebar';
import SubAdminHeader from './SubAdminHeader';
import { Outlet } from 'react-router-dom';

const SubAdminLayout = ({ onLogout }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SubAdminHeader handleDrawerToggle={handleDrawerToggle} onLogout={onLogout} />
      <SubAdminSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          marginTop: '64px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SubAdminLayout;