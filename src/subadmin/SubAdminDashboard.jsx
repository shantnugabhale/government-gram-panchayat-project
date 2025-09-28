import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapIcon from '@mui/icons-material/Map';

const SubAdminDashboard = () => {
  // These values would normally come from an API call
  const stats = {
    totalTalukas: 5,
    totalGramPanchayats: 50,
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Sub-Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
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
            <Typography variant="h6">Assigned Talukas</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stats.totalTalukas}
            </Typography>
          </Paper>
        </Grid>

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
            <Typography variant="h6">Gram Panchayats</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stats.totalGramPanchayats}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubAdminDashboard;