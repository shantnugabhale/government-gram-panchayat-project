import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Grid, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig.js"; // Import db
import { collection, query, where, getDocs } from "firebase/firestore"; // Import firestore functions

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
import GrampanchayatMahiti from "@/pages/GrampanchayatMahiti";
import GrampanchayatNaksha from "@/pages/GrampanchayatNaksha";
import GrampanchayatSadasya from "@/pages/GrampanchayatSadasya";
import GramsabhaNirnay from "@/pages/GramsabhaNirnay";
import GramPuraskar from "@/pages/GramPuraskar";
import Festival from "@/pages/Festival";
import GramSuvidha from "@/pages/GramSuvidha";
import Gramparyatansthale from "@/pages/Gramparyatansthale";
import Gramjanganna from "@/pages/Gramjanganna";
import GramDhurdhvani from "@/pages/GramDhurdhvani";
import GramHelpline from "@/pages/GramHelpline";
import GramRugnalay from "@/pages/GramRugnalay";
import SwachhGav from "@/pages/SwachhGav";
import Vikeltepikel from "@/pages/Vikeltepikel";

// --- Admin ---
import AdminLayout from '@/admin/pages/AdminLayout';
import Dashboard from '@/admin/components/Dashboard';
import AdminManagement from "@/admin/components/AdminManagement";
import GramPanchayatManage from "@/admin/components/GramPanchayatManage";
import GramPanchayatUpload from "@/admin/components/GramPanchayatUpload";
import SubAdminManagement from "@/admin/components/SubAdminManagement";
import UserManagement from "@/admin/components/UserManagement";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navbarHeight = 64;
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check if the user is an admin
        const adminsRef = collection(db, "admins");
        const q = query(adminsRef, where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdminPanel = location.pathname.startsWith('/admin');

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
          <Route path="/login" element={!user ? <LoginPage /> : (isAdmin ? <Navigate to="/admin" /> : <Navigate to="/" />)} />
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

          {/* --- Grampanchayat Dropdown Routes --- */}
          <Route path="/grampanchayat-mahitī" element={<ProtectedRoute user={user}><GrampanchayatMahiti /></ProtectedRoute>} />
          <Route path="/grampanchayat-nakshā" element={<ProtectedRoute user={user}><GrampanchayatNaksha /></ProtectedRoute>} />
          <Route path="/grampanchayat-sadasya" element={<ProtectedRoute user={user}><GrampanchayatSadasya /></ProtectedRoute>} />
          <Route path="/gramsabhēchē-nirṇay" element={<ProtectedRoute user={user}><GramsabhaNirnay /></ProtectedRoute>} />
          <Route path="/gram-puraskār" element={<ProtectedRoute user={user}><GramPuraskar /></ProtectedRoute>} />
          <Route path="/saṇa-utsav" element={<ProtectedRoute user={user}><Festival /></ProtectedRoute>} />
          <Route path="/gram-suvidhā" element={<ProtectedRoute user={user}><GramSuvidha /></ProtectedRoute>} />
          <Route path="/gramparyatan-sthaḷē" element={<ProtectedRoute user={user}><Gramparyatansthale /></ProtectedRoute>} />

          {/* --- Nirdeshika Dropdown Routes --- */}
          <Route path="/nirdēśikā-janagaṇanā" element={<ProtectedRoute user={user}><Gramjanganna /></ProtectedRoute>} />
          <Route path="/nirdēśikā-dūradhvanī-kramāṅka" element={<ProtectedRoute user={user}><GramDhurdhvani /></ProtectedRoute>} />
          <Route path="/nirdēśikā-hēlpālā'īna" element={<ProtectedRoute user={user}><GramHelpline /></ProtectedRoute>} />
          <Route path="/nirdēśikā-rugṇālay" element={<ProtectedRoute user={user}><GramRugnalay /></ProtectedRoute>} />

            {/* --- Upkram Dropdown Routes --- */}
            <Route path="/upakram-svaccha-gāva" element={<ProtectedRoute user={user}><SwachhGav /></ProtectedRoute>} />
            <Route path="/upakram-vikēla-tē-pikēla" element={<ProtectedRoute user={user}><Vikeltepikel /></ProtectedRoute>} />


          {/* --- Admin Panel Routes --- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <AdminLayout onLogout={handleLogout} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-admins" element={<AdminManagement />} />
            <Route path="manage-gp-details" element={<GramPanchayatManage />} />
            <Route path="upload-gp-details" element={<GramPanchayatUpload />} />
            <Route path="manage-sub-admins" element={<SubAdminManagement />} />
            <Route path="manage-users" element={<UserManagement />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />

        </Routes>
      </Box>
      {user && !isAdminPanel && <Footer />}
    </>
  );
}

export default App;