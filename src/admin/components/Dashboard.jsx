import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapIcon from '@mui/icons-material/Map';

const Dashboard = () => {
  // These values would normally come from an API call
  const stats = {
    totalUsers: 1234,
    totalSubAdmins: 5,
    totalTalukas: 15,
    totalGramPanchayats: 250,
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
              backgroundColor: '#1976d2',
            }}
          >
            <PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stats.totalUsers}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Sub-Admins Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
              backgroundColor: '#f57c00',
            }}
          >
            <SupervisorAccountIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Total Sub-Admins</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stats.totalSubAdmins}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Talukas Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
              backgroundColor: '#388e3c',
            }}
          >
            <MapIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Total Talukas</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stats.totalTalukas}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Gram Panchayats Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
              backgroundColor: '#d32f2f',
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Total Gram Panchayats</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stats.totalGramPanchayats}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;