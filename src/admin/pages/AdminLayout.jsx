import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ onLogout }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminHeader handleDrawerToggle={handleDrawerToggle} onLogout={onLogout} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
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

export default AdminLayout;