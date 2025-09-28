import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Grid, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "/src/firebaseConfig.js";
import { collection, query, where, getDocs } from "firebase/firestore";

// --- Components ---
import ProtectedRoute from "/src/components/ProtectedRoute.jsx";
import Navbar from "/src/components/Navbar.jsx";
import Photosection from "/src/components/Photosection.jsx";
import RajyaGeetSection from "/src/components/RajyaGeetSection.jsx";
import MessagesSection from "/src/components/MessagesSection.jsx";
import MembersSection from "/src/components/MembersSection.jsx";
import GrampanchayatInfo from "/src/components/GrampanchayatInfo.jsx";
import DigitalSlogans from "/src/components/DigitalSlogans.jsx";
import GovLogosSection from "/src/components/GovLogosSection.jsx";
import Footer from "/src/components/Footer.jsx";

// --- Pages ---
import LoginPage from "/src/pages/Login.jsx";
import RegistrationPage from "/src/pages/Registration.jsx";
import GrampanchayatMahiti from "/src/pages/GrampanchayatMahiti.jsx";
import GrampanchayatNaksha from "/src/pages/GrampanchayatNaksha.jsx";
import GrampanchayatSadasya from "/src/pages/GrampanchayatSadasya.jsx";
import GramsabhaNirnay from "/src/pages/GramsabhaNirnay.jsx";
import GramPuraskar from "/src/pages/GramPuraskar.jsx";
import Festival from "/src/pages/Festival.jsx";
import GramSuvidha from "/src/pages/GramSuvidha.jsx";
import Gramparyatansthale from "/src/pages/Gramparyatansthale.jsx";
import Gramjanganna from "/src/pages/Gramjanganna.jsx";
import GramDhurdhvani from "/src/pages/GramDhurdhvani.jsx";
import GramHelpline from "/src/pages/GramHelpline.jsx";
import GramRugnalay from "/src/pages/GramRugnalay.jsx";
import SwachhGav from "/src/pages/SwachhGav.jsx";
import Vikeltepikel from "/src/pages/Vikeltepikel.jsx";

// --- Admin ---
import AdminLayout from '/src/admin/pages/AdminLayout.jsx';
import Dashboard from '/src/admin/components/Dashboard.jsx';
import AdminManagement from "/src/admin/components/AdminManagement.jsx";
import GramPanchayatManage from "/src/admin/components/GramPanchayatManage.jsx";
import GramPanchayatUpload from "/src/admin/components/GramPanchayatUpload.jsx";
import SubAdminManagement from "/src/admin/components/SubAdminManagement.jsx";
import UserManagement from "/src/admin/components/UserManagement.jsx";

// --- Sub-Admin ---
import SubAdminLayout from '/src/subadmin/SubAdminLayout.jsx';
import SubAdminDashboard from '/src/subadmin/SubAdminDashboard.jsx';
import SubAdminProfile from '/src/subadmin/SubAdminProfile.jsx';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navbarHeight = 64;
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin', 'subadmin', or 'user'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check if the user is a super admin
        const adminsRef = collection(db, "admins");
        const adminQuery = query(adminsRef, where("email", "==", currentUser.email));
        const adminQuerySnapshot = await getDocs(adminQuery);

        if (!adminQuerySnapshot.empty) {
            setUserRole('admin');
        } else {
            // Check if the user is a sub-admin
            const subAdminsRef = collection(db, "subAdmins");
            const subAdminQuery = query(subAdminsRef, where("email", "==", currentUser.email));
            const subAdminQuerySnapshot = await getDocs(subAdminQuery);
            if (!subAdminQuerySnapshot.empty) {
                setUserRole('subadmin');
            } else {
                setUserRole('user');
            }
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdminPanel = location.pathname.startsWith('/admin') || location.pathname.startsWith('/subadmin');

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

  const getRedirectPath = () => {
    if (!user) return "/login";
    if (userRole === 'admin') return "/admin";
    if (userRole === 'subadmin') return "/subadmin";
    return "/";
  };

  return (
    <>
      {user && !isAdminPanel && <Navbar onLogout={handleLogout} />}
      <Box sx={{ pt: user && !isAdminPanel ? `${navbarHeight}px` : 0 }}>
        <Routes>
          {/* --- Auth Routes --- */}
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={getRedirectPath()} />} />
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
            path="/admin/*"
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

            {/* --- Sub-Admin Panel Routes --- */}
            <Route
            path="/subadmin/*"
            element={
                <ProtectedRoute user={user}>
                <SubAdminLayout onLogout={handleLogout} />
                </ProtectedRoute>
            }
            >
            <Route index element={<SubAdminDashboard />} />
            <Route path="dashboard" element={<SubAdminDashboard />} />
            <Route path="profile" element={<SubAdminProfile />} />
            <Route path="manage-gp-details" element={<GramPanchayatManage />} />
            <Route path="upload-gp-details" element={<GramPanchayatUpload />} />
            </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={getRedirectPath()} />} />

        </Routes>
      </Box>
      {user && !isAdminPanel && <Footer />}
    </>
  );
}

export default App;

