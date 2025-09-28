import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  CloudUpload as CloudUploadIcon,
  AccountCircle as AccountCircleIcon, // Import Profile Icon
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const SubAdminSidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawerItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/subadmin/dashboard' },
    { text: 'My Profile', icon: <AccountCircleIcon />, path: '/subadmin/profile' }, // Added Profile Link
    { divider: true },
    { text: 'Upload GP Details', icon: <CloudUploadIcon />, path: '/subadmin/upload-gp-details' },
    { text: 'Manage GP Details', icon: <BusinessIcon />, path: '/subadmin/manage-gp-details' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {drawerItems.map((item, index) => {
          if (item.divider) {
            return <Divider key={index} />;
          }
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                })}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SubAdminSidebar;