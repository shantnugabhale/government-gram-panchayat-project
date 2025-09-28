import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, CircularProgress, Alert } from '@mui/material';
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const GramPanchayatUpload = () => {
  const [user, loadingAuth] = useAuthState(auth);
  const [subAdminData, setSubAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubAdminData = async () => {
      if (user) {
        try {
          const subAdminsRef = collection(db, "subAdmins");
          const q = query(subAdminsRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const subAdminDoc = querySnapshot.docs[0];
            setSubAdminData(subAdminDoc.data());
          } else {
            setError("Sub-admin profile not found.");
          }
        } catch (err) {
          setError("Failed to fetch sub-admin data.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!loadingAuth) {
      fetchSubAdminData();
    }
  }, [user, loadingAuth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      taluka: data.get('taluka'),
      gpName: data.get('gpName'),
      population: data.get('population'),
      sarpanchName: data.get('sarpanchName'),
      district: data.get('district'),
    };
    
    try {
      const docRef = await addDoc(collection(db, "gramPanchayats"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert('Gram Panchayat details submitted successfully!');
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Error submitting Gram Panchayat details.');
    }
  };

  if (loadingAuth || isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Upload Gram Panchayat Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              name="district" 
              required 
              fullWidth 
              label="District" 
              value={subAdminData?.district || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              name="taluka" 
              required 
              fullWidth 
              label="Taluka Name" 
              value={subAdminData?.taluka || ''}
              InputProps={{
                readOnly: true,
              }}
            />
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