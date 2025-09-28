import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import "../styles/Auth.css";
import { auth, db } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const getLoginErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Invalid email or password. Please try again.";
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Check for admin role first
      const adminsRef = collection(db, "admins");
      const adminQuery = query(adminsRef, where("email", "==", email));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin");
        return;
      }

      // Check for sub-admin role
      const subAdminsRef = collection(db, "subAdmins");
      const subAdminQuery = query(subAdminsRef, where("email", "==", email));
      const subAdminSnapshot = await getDocs(subAdminQuery);

      if (!subAdminSnapshot.empty) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/subadmin");
        return;
      }

      // If not an admin or sub-admin, attempt a regular user login
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    } catch (error) {
      console.error("Firebase Login Error Code:", error.code);
      const errorMessage = getLoginErrorMessage(error.code);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box className="auth-container">
      <header className="auth-header">
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Gram Panchayat Website
        </Typography>
      </header>

      <Box className="auth-content-wrapper">
        <Container component="main" maxWidth="xs">
          <Paper elevation={6} className="auth-paper" sx={{ position: 'relative' }}>
            {isLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 2,
                  borderRadius: '8px',
                }}
              >
                <CircularProgress />
              </Box>
            )}
            <img src="/satyamev.jpeg" alt="National Emblem" className="auth-logo" />
            <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
              User Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="auth-button"
                disabled={isLoading}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default LoginPage;