import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import SplashScreen from './components/SplashScreen';
import { SkyCanvas, StarsCanvas } from './components/canvas';
import { About, Contact, Experience, Hero, Navbar, Tech, Projects, Footer, Home } from './components';
import { Groome } from './pages';

const App = () => {
  const [loading, setLoading] = useState(true);

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  const handleToggleChange = () => {
    setIsDark(!isDark);
    document.dispatchEvent(new Event('themeChange')); // Dispatch custom event
  };

  return (
    <BrowserRouter>
      <div data-theme={isDark ? "dark" : ""} className='bg relative z-0'>
        {loading ? (
          <SplashScreen setLoading={setLoading} />
        ) : (
          <div>
            <Navbar isDark={isDark} handleToggleChange={handleToggleChange} />

            <Routes>
              <Route path="/" element={<HomePage isDark={isDark} />}>
                <Route index element={<Home />} />
                <Route path="/hero" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/footer" element={<Footer />} />
              </Route>

              <Route path="/case-study-groome" element={<Groome />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

const HomePage = ({ isDark }) => {
  return (
    <React.Fragment>
      <div className="relative">
        <Home />
        <Hero />
        {isDark ? <StarsCanvas /> : <SkyCanvas />}
      </div>
      <About />
      <Experience />
      <Projects />
      <div className="relative">
        <Contact />
        <Footer />
        {isDark ? <StarsCanvas /> : <SkyCanvas />}
      </div>
    </React.Fragment>
  );
};

export default App;
