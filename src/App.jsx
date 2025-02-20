import React, { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import MobileHome from './pages/MobileHome.jsx'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileHome /> : <Home />;
}

export default App
