import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import "../styles/Auth.css";

// Mock data
const districts = ["Mumbai", "Pune", "Nagpur", "Nashik"];
const talukasByDistrict = {
  Mumbai: ["Andheri", "Borivali", "Kurla"],
  Pune: ["Haveli", "Maval", "Mulshi"],
  Nagpur: ["Nagpur City", "Hingna", "Kamthi"],
  Nashik: ["Nashik", "Igatpuri", "Sinnar"],
};
const gramPanchayatsByTaluka = {
  Andheri: ["Juhu Gram Panchayat", "Versova Gram Panchayat"],
  Borivali: ["Mandapeshwar Gram Panchayat", "Gorai Gram Panchayat"],
  // ... add other mappings
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "",
    email: "", phone: "", aadhaar: "", district: "",
    taluka: "", gramPanchayat: "",
  });
  const [availableTalukas, setAvailableTalukas] = useState([]);
  const [availableGPs, setAvailableGPs] = useState([]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData({
      ...formData, district: selectedDistrict, taluka: "", gramPanchayat: "",
    });
    setAvailableTalukas(talukasByDistrict[selectedDistrict] || []);
    setAvailableGPs([]);
  };
  
  const handleTalukaChange = (e) => {
    const selectedTaluka = e.target.value;
    setFormData({ ...formData, taluka: selectedTaluka, gramPanchayat: "" });
    setAvailableGPs(gramPanchayatsByTaluka[selectedTaluka] || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <Box className="auth-container">
      <header className="auth-header">
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Gram Panchayat Website
        </Typography>
      </header>

      {/* New content wrapper for centering */}
      <Box className="auth-content-wrapper">
        <Container component="main">
          <Paper elevation={6} className="auth-paper registration-paper">
            <img src="/satyamev.jpeg" alt="National Emblem" className="auth-logo" />
            <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
              Create New Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                {/* Form fields remain the same */}
                <Grid item xs={12} sm={4}><TextField name="firstName" required fullWidth label="First Name" autoFocus value={formData.firstName} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={4}><TextField name="middleName" fullWidth label="Middle Name" value={formData.middleName} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={4}><TextField name="lastName" required fullWidth label="Last Name" value={formData.lastName} onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField name="email" required fullWidth label="Email Address" type="email" value={formData.email} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="phone" required fullWidth label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="aadhaar" required fullWidth label="Aadhaar Card Number" value={formData.aadhaar} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required><InputLabel>District</InputLabel><Select name="district" value={formData.district} label="District" onChange={handleDistrictChange}>{districts.map((d) => (<MenuItem key={d} value={d}>{d}</MenuItem>))}</Select></FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required><InputLabel>Taluka</InputLabel><Select name="taluka" value={formData.taluka} label="Taluka" onChange={handleTalukaChange} disabled={!formData.district}>{availableTalukas.map((t) => (<MenuItem key={t} value={t}>{t}</MenuItem>))}</Select></FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required><InputLabel>Gram Panchayat Name</InputLabel><Select name="gramPanchayat" value={formData.gramPanchayat} label="Gram Panchayat Name" onChange={handleChange} disabled={!formData.taluka}>{availableGPs.map((gp) => (<MenuItem key={gp} value={gp}>{gp}</MenuItem>))}</Select></FormControl>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" className="auth-button">Register</Button>
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}><Grid item><Link component={RouterLink} to="/login" variant="body2">Already have an account? Sign in</Link></Grid></Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default RegistrationPage;