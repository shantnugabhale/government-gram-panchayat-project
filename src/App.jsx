import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Grid, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

// --- Components ---
import ProtectedRoute from "@/components/ProtectedRoute"; 
import Navbar from "@/components/Navbar";
import Photosection from "@/components/Photosection";
import RajyaGeetSection from "@/components/RajyaGeetSection";
import MessagesSection from "@/components/MessagesSection";
import MembersSection from "@/components/MembersSection";
import GrampanchayatInfo from "@/components/GrampanchayatInfo";
import DigitalSlogans from "@/components/DigitalSlogans";
import GovLogosSection from "@/components/GovLogosSection";
import Footer from "@/components/Footer";

// --- Pages ---
import LoginPage from "@/pages/Login";
import RegistrationPage from "@/pages/Registration";
// ... (Make sure to import all your other pages here)

// --- Admin ---
import AdminLayout from '@/admin/pages/AdminLayout';
import Dashboard from '@/admin/components/Dashboard';
// ... (Make sure to import all your other admin components here)


function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navbarHeight = 64;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdminPanel = location.pathname.startsWith('/admin');

  const handleLogin = (email) => {
    if (email === "admin@example.com") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      console.error("Logout Error:", error);
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {user && !isAdminPanel && <Navbar onLogout={handleLogout} />}
      <Box sx={{ pt: user && !isAdminPanel ? `${navbarHeight}px` : 0 }}>
        <Routes>
          {/* --- Auth Routes --- */}
          <Route path="/login" element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <RegistrationPage /> : <Navigate to="/" />} />

          {/* --- Main Homepage Route --- */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <>
                  <Photosection />
                  <RajyaGeetSection />
                   <Box sx={{ width: "100%", p: 0, m: 0 }}>
                    <Grid container spacing={isMobile ? 2 : 4} sx={{ width: "100%", m: 0, p: 0 }}>
                      <Grid item xs={12} md={6} lg={5}>
                        <MessagesSection />
                      </Grid>
                      <Grid item xs={12} md={6} lg={7}>
                        <MembersSection />
                      </Grid>
                    </Grid>
                  </Box>
                  <GrampanchayatInfo />
                  <DigitalSlogans />
                  <Box sx={{ width: "100%", overflow: "hidden", m: 0, p: 0 }}>
                    <GovLogosSection />
                  </Box>
                </>
              </ProtectedRoute>
            }
          />

          {/* --- Admin Panel Routes --- */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute user={user}>
                <AdminLayout onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />

        </Routes>
      </Box>
      {user && !isAdminPanel && <Footer />}
    </>
  );
}

export default App;