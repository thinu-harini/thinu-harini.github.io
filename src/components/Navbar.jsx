import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, menuLinks } from '../constants';
import SocialIcons from './SocialIcons';
import '../assets/styles/Navbar.css';
import { styles } from '../styles';
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { SvgLogo } from "./SvgLogo.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import ThemeSwitcher from './ThemeSwitcher.jsx';
import Tooltip from './Tooltip';

const Navbar = ({ handleThemeChange, isDark }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navMenuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);

    const handleClickOutside = (event) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className={`navbar ${styles.paddingX} hero-text ${scrolled ? "nav-bg" : "bg-transparent"}`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className='flex items-center gap-2 custom-pointer'
            onClick={() => window.scrollTo(0, 0)}

          >
            <SvgLogo className='w-28 h-auto' data-tooltip="Go to homepage" />
          </Link>

          <div className='nav-button-container'>
            {/* buttons on navbar */}
            <ThemeSwitcher
              handleThemeChange={handleThemeChange}
              isDark={isDark}
              data-tooltip="Switch theme"
            />
            <MusicPlayer
              data-tooltip="Play music"
            />

            {/* menu button */}
            <div
              className='floating-button md:hidden'
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              data-tooltip={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <IoClose size={28} />
              ) : (
                <HiMenu size={28} />
              )}
            </div>
          </div>

          {/* large devices - nav links */}
          <ul className="list-none hidden md:flex flex-row gap-10">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`nav-title ${location.pathname === nav.path ? 'nav-title-active' : 'nav-title-inactive'}`}

              >
                <Link to={nav.path} className="custom-pointer" data-tooltip={nav.title}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Small devices - side menu */}
      <div
        id="nav-menu"
        ref={navMenuRef}
        className={`menu ${menuOpen ? 'open' : ''} hero-text md:hidden`}
        role="dialog"
        aria-hidden={!menuOpen}
      >
        <ul className="list-none">
          {menuLinks.map((nav) => (
            <li
              key={nav.id}
              className={`menu-content ${location.pathname === nav.path ? 'nav-title-active' : 'nav-title-inactive'}`}
              onClick={() => setMenuOpen(false)}
              data-tooltip={nav.title}
            >
              <Link to={nav.path} className="custom-pointer">{nav.title}</Link>
            </li>
          ))}
        </ul>

        <div className='menu-footer'>
          <hr className="menu-divider" />
          <SocialIcons
            data-tooltip="Follow us"
          />
        </div>
      </div>

      <Tooltip />
    </>
  );
}

export default Navbar;
