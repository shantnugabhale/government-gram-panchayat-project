import React from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';

const GramPanchayatUpload = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      taluka: data.get('taluka'),
      gpName: data.get('gpName'),
      population: data.get('population'),
      sarpanchName: data.get('sarpanchName'),
    };
    console.log(formData);
    alert('Gram Panchayat details submitted!');
    // Here you would typically send the data to your API
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Upload Gram Panchayat Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="taluka" required fullWidth label="Taluka Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="gpName" required fullWidth label="Gram Panchayat Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="population" required fullWidth label="Total Population" type="number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="sarpanchName" required fullWidth label="Sarpanch Name" />
          </Grid>
          {/* Add more fields as needed */}
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Upload Details
        </Button>
      </Box>
    </Paper>
  );
};

export default GramPanchayatUpload;
