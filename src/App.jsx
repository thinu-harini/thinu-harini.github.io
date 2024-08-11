import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import SplashScreen from './components/SplashScreen';
import { Navbar, ScrollToTop } from './components';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Writings from './pages/Writings';
import Contact from './pages/Contact';
import { Groome } from './pages';

const App = () => {
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Detect user's color scheme preference and use it as default for dark mode
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  // dark mode - light mode function
  const handleThemeChange = () => {
    setIsDark(!isDark);
    document.dispatchEvent(new Event('themeChange')); // Dispatch custom event
  };

  return (
    <BrowserRouter>
      <div data-theme={isDark ? 'dark' : ''} className='bg relative z-0'>
        {loading ? (
          <SplashScreen setLoading={setLoading} />
        ) : (
          <div>
            <Navbar handleThemeChange={handleThemeChange} isDark={isDark} />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home isDark={isDark} />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/writings" element={<Writings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/groome-case-study" element={<Groome />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
