import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Grid, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Import components
import Navbar from "./components/Navbar";
import Photosection from "./components/Photosection";
import RajyaGeetSection from "./components/RajyaGeetSection";
import MessagesSection from "./components/MessagesSection";
import MembersSection from "./components/MembersSection";
import GrampanchayatInfo from "./components/GrampanchayatInfo";
import DigitalSlogans from "./components/DigitalSlogans";
import GovLogosSection from "./components/GovLogosSection";
import Footer from "./components/Footer";

// Import pages
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration"; // Import the new Registration page
import GrampanchayatMahiti from "./pages/GrampanchayatMahiti";
import GrampanchayatNaksha from "./pages/GrampanchayatNaksha";
import GrampanchayatSadasya from "./pages/GrampanchayatSadasya";
import GramsabhaNirnay from "./pages/GramsabhaNirnay";
import GramPuraskar from "./pages/GramPuraskar";
import Festival from "./pages/Festival";
import GramSuvidha from "./pages/GramSuvidha";
import Gramparyatansthale from "./pages/Gramparyatansthale";
import Gramjanganna from "./pages/Gramjanganna";
import GramDhurdhvani from "./pages/GramDhurdhvani";
import GramHelpline from "./pages/GramHelpline";
import GramRugnalay from "./pages/GramRugnalay";
import SwachhGav from "./pages/SwachhGav";
import Vikeltepikel from "./pages/Vikeltepikel";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navbarHeight = 64;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Box sx={{ pt: isAuthenticated ? `${navbarHeight}px` : 0 }}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationPage />} /> {/* Add this new route */}

          {/* Home Page */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Photosection />
                  <RajyaGeetSection />
                  <Box sx={{ width: "100%", p: 0, m: 0 }}>
                    <Grid
                      container
                      spacing={isMobile ? 2 : 4}
                      sx={{ width: "100%", m: 0, p: 0 }}
                    >
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
                  <Box
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      m: 0,
                      p: 0,
                    }}
                  >
                    <GovLogosSection />
                  </Box>
                </>
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Other Routes */}
          <Route path="/ग्रामपंचायत-माहिती" element={<GrampanchayatMahiti />} />
          <Route path="/ग्रामपंचायत-नकाशा" element={<GrampanchayatNaksha />} />
          <Route path="/ग्रामपंचायत-सदस्य" element={<GrampanchayatSadasya />} />
          <Route path="/ग्रामपंचायत-ग्रामसभेचे निर्णय" element={<GramsabhaNirnay />} />
          <Route path="/ग्रामपंचायत-पुरस्कार" element={<GramPuraskar />} />
          <Route path="/ग्रामपंचायत-सण/उत्सव" element={<Festival />} />
          <Route path="/ग्रामपंचायत-सुविधा" element={<GramSuvidha />} />
          <Route path="/ग्रामपंचायत-पर्यटन सथळे" element={<Gramparyatansthale/>} />
          <Route path="/निर्देशिका-जनगणना" element={<Gramjanganna/>} />
          <Route path="/निर्देशिका-दूरध्वनी क्रमांक" element={<GramDhurdhvani/>} />
          <Route path="/निर्देशिका-हेल्पलाईन" element={<GramHelpline />} />
          <Route path="/निर्देशिका-रुग्ालय" element={<GramRugnalay />} />
          <Route path="/उपक्रम-स्वच्छ गाव" element={<SwachhGav />} />
          <Route path="/उपक्रम-विकेल-ते-पिकेल" element={<Vikeltepikel />} />
        </Routes>
      </Box>
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;