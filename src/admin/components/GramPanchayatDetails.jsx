import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const GramPanchayatDetails = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Gram Panchayat Details
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField fullWidth label="Gram Panchayat Name" sx={{ mb: 2 }} />
        <TextField fullWidth label="Population" sx={{ mb: 2 }} />
        <TextField fullWidth label="Area (in sq. km)" sx={{ mb: 2 }} />
        {/* Add more fields as needed */}
        <Button variant="contained" color="primary">
          Save Details
        </Button>
      </Box>
    </Paper>
  );
};

export default GramPanchayatDetails;