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
} from "@mui/material";
import "../styles/Auth.css";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password") {
      onLogin();
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
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
        <Container component="main" maxWidth="xs">
          <Paper elevation={6} className="auth-paper">
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="auth-button"
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