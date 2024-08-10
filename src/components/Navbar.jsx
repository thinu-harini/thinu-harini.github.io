import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks, menuLinks } from '../constants';
import SocialIcons from './SocialIcons';

import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { SvgLogo } from "./SvgLogo.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import { Toggle } from "./Toggle";

const Navbar = ({ isDark, handleToggleChange }) => {
  const [menuOpen, setMenuOpen] = useState(false); // manages the state of the dropdown menu (open/closed)
  const [scrolled, setScrolled] = useState(false); // determines if the page has been scrolled down
  const dropdownRef = useRef(null); // detects outside clicks of dropdown menu
  const location = useLocation();

  // Adjusts the scrolled state based on scroll position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);

    // Closes the dropdown menu if a click occurs outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Closes the dropdown menu on window resize
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

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <nav className={`${styles.paddingX} ${styles.heroContent} w-full flex items-center py-4 fixed top-0 z-20 ${scrolled ? "nav-bg" : "bg-transparent"}`}>
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/"
            className='flex items-center gap-2'
            onClick={() => window.scrollTo(0, 0)}
          >
            <SvgLogo className='w-28 h-auto' />
          </Link>

          <div className='md:flex-row flex items-center gap-4'>

            {/* {Toggle and MusicPlayer */}
            <Toggle isChecked={isDark} handleChange={handleToggleChange} />
            <MusicPlayer />

            {/* menu button */}
            <div className='md:hidden'>
              {menuOpen ? (
                <IoClose
                  size={32}
                  className="menu-icon object-contain cursor-pointer"
                  onClick={toggleMenu}
                />
              ) : (
                <HiMenu
                  size={32}
                  className="menu-icon object-contain cursor-pointer"
                  onClick={toggleMenu}
                />
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
                <Link to={nav.path}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Small devices - side menu */}
      <div ref={dropdownRef} className={`menu ${menuOpen ? 'open' : ''} ${styles.heroContent}`}>

        <ul className="list-none">
          {menuLinks.map((nav) => (
            <li
              key={nav.id}
              className={`menu-content ${location.pathname === nav.path ? 'nav-title-active' : 'nav-title-inactive'}`}
              onClick={() => setMenuOpen(false)}
            >
              <Link to={nav.path}>{nav.title}</Link>
            </li>
          ))}
        </ul>

        <div className='menu-footer'>
          <hr className="menu-divider" />
          <SocialIcons />
        </div>

      </div >
    </>
  );
}

export default Navbar;
