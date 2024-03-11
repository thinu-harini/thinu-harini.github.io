import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { About, Contact, Experience, Hero, Navbar, Tech, Projects, StarsCanvas, Footer, Home } from './components';
import SplashScreen from './components/SplashScreen';
import { CloudsCanvas } from './components/canvas';

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

            <div className="relative">
              <Home />
              {/* {isDark && <CloudsCanvas />} */}
              {isDark ? <StarsCanvas /> : <CloudsCanvas />}
            </div>
            <Hero />
            <About />
            <Experience />
            <Projects />

            <div className="relative">
              <Contact />
              <Footer />
              {isDark && <StarsCanvas />}
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
