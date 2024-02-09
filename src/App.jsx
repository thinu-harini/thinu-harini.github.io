import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas, Footer } from './components';

const App = () => {

  return (
    <BrowserRouter>
      <div className="realtive z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
        </div>
        <div className="relative z-0">
          <Hero />
          <About />
          <StarsCanvas />
        </div>
        <div className="relative z-0">
          <Experience />
          <StarsCanvas />
        </div>
        {/* <Tech /> */}
        <div className="relative z-0">
          <Works />
          <StarsCanvas />
        </div>
        <div className="relative z-0">
          <Contact />
          <Footer />
          <StarsCanvas />
        </div>
        
      </div></BrowserRouter>
  )
}

export default App
