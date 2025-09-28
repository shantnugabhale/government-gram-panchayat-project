import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import "../styles/Auth.css";
import { auth, db } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    aadhaar: "",
    district: "",
    taluka: "",
    gramPanchayat: "",
    password: "",
  });
  const [districts, setDistricts] = useState([]);
  const [talukasByDistrict, setTalukasByDistrict] = useState({});
  const [gramPanchayatsByTaluka, setGramPanchayatsByTaluka] = useState({});
  const [availableTalukas, setAvailableTalukas] = useState([]);
  const [availableGPs, setAvailableGPs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGramPanchayatData = async () => {
      try {
        const gramPanchayatsRef = collection(db, "gramPanchayats");
        const querySnapshot = await getDocs(gramPanchayatsRef);

        const districtsSet = new Set();
        const talukas = {};
        const gramPanchayats = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          districtsSet.add(data.district);

          if (!talukas[data.district]) {
            talukas[data.district] = new Set();
          }
          talukas[data.district].add(data.taluka);

          if (!gramPanchayats[data.taluka]) {
            gramPanchayats[data.taluka] = new Set();
          }
          gramPanchayats[data.taluka].add(data.gpName);
        });

        setDistricts(Array.from(districtsSet));

        const talukasArray = {};
        for (const district in talukas) {
          talukasArray[district] = Array.from(talukas[district]);
        }
        setTalukasByDistrict(talukasArray);

        const gramPanchayatsArray = {};
        for (const taluka in gramPanchayats) {
          gramPanchayatsArray[taluka] = Array.from(gramPanchayats[taluka]);
        }
        setGramPanchayatsByTaluka(gramPanchayatsArray);
      } catch (err) {
        setError("Failed to fetch location data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGramPanchayatData();
  }, []);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData({
      ...formData,
      district: selectedDistrict,
      taluka: "",
      gramPanchayat: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        aadhaar: formData.aadhaar,
        district: formData.district,
        taluka: formData.taluka,
        gramPanchayat: formData.gramPanchayat,
      });

      console.log("Registration Data:", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box className="auth-container">
      <header className="auth-header">
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Gram Panchayat Website
        </Typography>
      </header>
      <Box className="auth-content-wrapper">
        <Container component="main">
          <Paper elevation={6} className="auth-paper registration-paper">
            <img
              src="/satyamev.jpeg"
              alt="National Emblem"
              className="auth-logo"
            />
            <Typography component="h2" variant="h5" sx={{ fontWeight: "bold" }}>
              Create New Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: "100%" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField name="firstName" required fullWidth label="First Name" autoFocus value={formData.firstName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField name="middleName" fullWidth label="Middle Name" value={formData.middleName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField name="lastName" required fullWidth label="Last Name" value={formData.lastName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="email" required fullWidth label="Email Address" type="email" value={formData.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="password" required fullWidth label="Password" type="password" value={formData.password} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="phone" required fullWidth label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="aadhaar" required fullWidth label="Aadhaar Card Number" value={formData.aadhaar} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>District</InputLabel>
                    <Select name="district" value={formData.district} label="District" onChange={handleDistrictChange}>
                      {districts.map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Taluka</InputLabel>
                    <Select name="taluka" value={formData.taluka} label="Taluka" onChange={handleTalukaChange} disabled={!formData.district}>
                      {availableTalukas.map((t) => (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Gram Panchayat Name</InputLabel>
                    <Select name="gramPanchayat" value={formData.gramPanchayat} label="Gram Panchayat Name" onChange={handleChange} disabled={!formData.taluka}>
                      {availableGPs.map((gp) => (
                        <MenuItem key={gp} value={gp}>
                          {gp}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" className="auth-button">
                Register
              </Button>
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default RegistrationPage;