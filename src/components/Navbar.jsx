import React, { useState, useEffect, useRef } from "react";

// Mock Link component for demo
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props} style={{ textDecoration: 'none', ...props.style }}>
    {children}
  </a>
);

// Mock useLocation hook
const useLocation = () => ({ pathname: "/" });

// Normalize paths: with dash, concatenated, or with space
const isPathMatch = (locationPath, parentName, itemName) => {
  const normalizeDash = str => str.replace(/\s+/g, "-");
  const normalizeConcat = str => str.replace(/\s+/g, "");
  const normalizeSpace = str => str;

  const dashed = `/${normalizeDash(parentName)}-${normalizeDash(itemName)}`;
  const concat = `/${normalizeConcat(parentName)}${normalizeConcat(itemName)}`;
  const space = `/${normalizeSpace(parentName)} ${normalizeSpace(itemName)}`;

  return locationPath === dashed || locationPath === concat || locationPath === space;
};

// Generate URL path for link
const getLinkPath = (parentName, itemName) => `/${parentName}-${itemName}`;

// Enhanced Dropdown Button Component
const DropdownButton = ({ title, anchor, handleOpen, handleClose, items, parentName, location }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleOpen}
        onMouseEnter={handleOpen}
        style={{
          background: 'none',
          border: 'none',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: items.some(item => isPathMatch(location.pathname, parentName, item)) ? "#2196f3" : "black",
          borderBottom: items.some(item => isPathMatch(location.pathname, parentName, item)) ? "2px solid #f32121ff" : "none",
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '16px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
        }}
      >
        {title}
        <span style={{
          fontSize: "20px",
          transition: "transform 0.3s",
          transform: anchor ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          ▼
        </span>
      </button>
      
      {anchor && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            background: 'white',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '8px 0',
            minWidth: '200px',
            zIndex: 1000,
            animation: 'slideDown 0.3s ease-out',
            border: '1px solid #e0e0e0'
          }}
          onMouseLeave={handleClose}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={getLinkPath(parentName, item)}
              style={{
                display: 'block',
                padding: '12px 20px',
                color: isPathMatch(location.pathname, parentName, item) ? '#2196f3' : '#333',
                background: isPathMatch(location.pathname, parentName, item) ? '#f0f8ff' : 'transparent',
                transition: 'all 0.2s ease',
                borderLeft: isPathMatch(location.pathname, parentName, item) ? '4px solid #2196f3' : '4px solid transparent'
              }}
              onClick={handleClose}
              onMouseEnter={(e) => {
                if (!isPathMatch(location.pathname, parentName, item)) {
                  e.target.style.background = '#f5f5f5';
                  e.target.style.color = '#2196f3';
                  e.target.style.transform = 'translateX(8px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isPathMatch(location.pathname, parentName, item)) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#333';
                  e.target.style.transform = 'translateX(0)';
                }
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose, navLinks, language, location }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '280px',
      height: '100vh',
      background: '#f8f9fa',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
      zIndex: 2000,
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
      overflowY: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #ddd',
        background: 'white'
      }}>
        <h3 style={{ margin: 0, color: 'black' }}>मेनू</h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'black'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: '20px 0' }}>
        {navLinks.map((link, i) => (
          <div key={i}>
            {link.dropdown ? (
              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '12px 20px',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'black'
                  }}
                >
                  {link.name}
                  <span style={{
                    transition: 'transform 0.3s',
                    transform: openDropdown === link.name ? 'rotate(180deg)' : 'rotate(0)'
                  }}>
                    ▼
                  </span>
                </button>
                {openDropdown === link.name && (
                  <div style={{ background: '#f0f0f0' }}>
                    {link.dropdown.map((item, j) => (
                      <Link
                        key={j}
                        to={getLinkPath(link.name, item)}
                        onClick={onClose}
                        style={{
                          display: 'block',
                          padding: '10px 40px',
                          color: isPathMatch(location.pathname, link.name, item) ? '#2196f3' : '#666',
                          fontWeight: isPathMatch(location.pathname, link.name, item) ? 'bold' : 'normal'
                        }}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={link.to}
                onClick={onClose}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  fontSize: '16px',
                  fontWeight: location.pathname === link.to ? 'bold' : 'normal',
                  color: location.pathname === link.to ? '#2196f3' : 'black'
                }}
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [language, setLanguage] = useState("mr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [grampanchayatAnchor, setGrampanchayatAnchor] = useState(null);
  const [directoryAnchor, setDirectoryAnchor] = useState(null);
  const [upkramAnchor, setUpkramAnchor] = useState(null);
  const [yojnaAnchor, setYojnaAnchor] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "मुख्य पृष्ठ", to: "/" },
    {
      name: "ग्रामपंचायत",
      dropdown: ["माहिती", "नकाशा", "सदस्य", "ग्रामसभेचे निर्णय", "पुरस्कार", "सण/उत्सव", "सुविधा", "ई सेवा", "पर्यटन सथळे"],
    },
    {
      name: "निर्देशिका",
      dropdown: ["जनगणना", "दूरध्वनी क्रमांक", "हेल्पलाइन", "रुग्णालय"],
    },
    {
      name: "उपक्रम",
      dropdown: ["स्वच्छ गाव", "विकेल-ते-पिकेल", "माझे कुटुंब, माझी जबाबदारी", "तंटामुक्त गाव", "जलयुक्त शिवार", "तुषारगावड", "रोती पूरक व्यवसाय", "गादोली", "मतदार नोंदणी", "सर्व शिक्षा अभियान", "क्रीडा स्पर्धा", "आरोग्य शिबिर", "कचऱ्याचे नियोजन", "बायोगॅस निर्मिती", "सेंद्रिय खत निर्मिती"],
    },
    { name: "योजना", dropdown: ["राज्य सरकार योजना", "केंद्र सरकार योजना"] },
    { name: "प्रगत शेतकरी", to: "/pragat-shetkari" },
    { name: "ई-शिक्षण", to: "/e-shikshan" },
    { name: "बातम्या", to: "/batmya" },
    { name: "संपर्क", to: "/contact" },
  ];

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileOpen && !event.target.closest('.mobile-menu')) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileOpen]);

  const handleCloseAllDropdowns = () => {
    setGrampanchayatAnchor(null);
    setDirectoryAnchor(null);
    setUpkramAnchor(null);
    setYojnaAnchor(null);
  };

  const toggleLanguage = () => setLanguage(prev => (prev === "mr" ? "en" : "mr"));

  const handleOpen = setter => event => {
    handleCloseAllDropdowns();
    setter(event.currentTarget);
  };

  const handleClose = setter => () => setter(null);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    setTimeout(() => {
      if (searchInputRef.current && !searchOpen) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Search query:', searchQuery);
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div>
      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1500
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav style={{
        background: isScrolled ? 'rgba(248, 249, 250, 0.95)' : '#f8f9fa',
        borderBottom: '2px solid #ccc',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          flexWrap: 'wrap'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(45deg, #3498db, #2196f3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              transition: 'transform 0.3s ease',
              animation: 'pulse 2s infinite'
            }}>
              🏛️
            </div>
            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'black',
                margin: 0
              }}>
                ग्रामपंचायत नाव
              </h1>
              <p style={{
                fontSize: '12px',
                color: '#666',
                margin: 0,
                fontWeight: '500'
              }}>
                Grampanchayat Name
              </p>
            </div>
          </Link>

          {/* Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            {/* Search - Desktop Only */}
            {!isMobile && (
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: searchOpen ? '#e0e0e0' : 'transparent',
                borderRadius: '25px',
                padding: searchOpen ? '6px 12px' : '6px',
                transition: 'all 0.3s ease',
                width: searchOpen ? '200px' : '40px',
                cursor: 'pointer',
                border: searchOpen ? '2px solid #2196f3' : '2px solid transparent'
              }}>
                <span 
                  onClick={handleSearchToggle}
                  style={{
                    fontSize: '20px',
                    color: 'black',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  🔍
                </span>
                {searchOpen && (
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                    placeholder={language === "mr" ? "शोधा..." : "Search..."}
                    style={{
                      marginLeft: '8px',
                      flex: 1,
                      fontSize: '14px',
                      color: 'black',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      width: '100%'
                    }}
                  />
                )}
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              style={{
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                border: '2px solid transparent',
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '6px 12px' : '8px 16px',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(33, 150, 243, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(33, 150, 243, 0.3)';
              }}
            >
              {language === "mr" ? "मराठी → English" : "English → मराठी"}
            </button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="mobile-menu"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: 'black',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            padding: '10px 20px',
            flexWrap: 'wrap',
            background: 'rgba(255, 255, 255, 0.7)',
            borderTop: '1px solid #e0e0e0'
          }}>
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <DropdownButton
                  key={i}
                  title={link.name}
                  anchor={
                    link.name === "ग्रामपंचायत" ? grampanchayatAnchor :
                    link.name === "निर्देशिका" ? directoryAnchor :
                    link.name === "उपक्रम" ? upkramAnchor : yojnaAnchor
                  }
                  handleOpen={
                    link.name === "ग्रामपंचायत" ? handleOpen(setGrampanchayatAnchor) :
                    link.name === "निर्देशिका" ? handleOpen(setDirectoryAnchor) :
                    link.name === "उपक्रम" ? handleOpen(setUpkramAnchor) : handleOpen(setYojnaAnchor)
                  }
                  handleClose={
                    link.name === "ग्रामपंचायत" ? handleClose(setGrampanchayatAnchor) :
                    link.name === "निर्देशिका" ? handleClose(setDirectoryAnchor) :
                    link.name === "उपक्रम" ? handleClose(setUpkramAnchor) : handleClose(setYojnaAnchor)
                  }
                  items={link.dropdown}
                  parentName={link.name}
                  location={location}
                />
              ) : (
                <Link
                  key={i}
                  to={link.to}
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    color: location.pathname === link.to ? 'white' : 'black',
                    background: location.pathname === link.to ? 'linear-gradient(45deg, #2196f3, #21cbf3)' : 'transparent',
                    boxShadow: location.pathname === link.to ? '0 4px 15px rgba(33, 150, 243, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== link.to) {
                      e.target.style.color = '#2196f3';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.to) {
                      e.target.style.color = 'black';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        language={language}
        location={location}
      />


    </div>
  );
};

export default Navbar;