import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';

import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { SvgLogo } from "./SvgLogo.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import { Toggle } from "./Toggle";

const Navbar = ({ isDark, handleToggleChange }) => {
  const [menuOpen, setMenuOpen] = useState(false); // manages the state of the dropdown menu (open/closed)
  const [scrolled, setScrolled] = useState(false); // determines if the page has been scrolled down
  const dropdownRef = useRef(null); // detects outside clicks of dropdown menu
  const location = useLocation();

  useEffect(() => {
    // Adjusts the scrolled state based on scroll position
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

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

  return (
    <nav className={`${styles.paddingX} ${styles.heroContent} w-full flex items-center py-4 fixed top-0 z-20 ${scrolled ? "nav-bg" : "bg-transparent"}`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => window.scrollTo(0, 0)}
        >
          <SvgLogo className='w-28 h-auto' />
        </Link>

        {/* menu button */}
        <div className='md:flex-row flex items-center gap-4'>

          {/* {Toggle component */}
          <Toggle isChecked={isDark} handleChange={handleToggleChange} />

          {/* Sound Button */}
          <MusicPlayer />

          <div className='md:hidden'>
            {menuOpen ? (
              <IoClose
                size={32}
                className="menu-icon object-contain cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            ) : (
              <HiMenuAlt3
                size={32}
                className="menu-icon object-contain cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            )}
          </div>
        </div>

        {/* nav links */}
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

        {/* dropdown menu */}
        <div ref={dropdownRef} className={`${styles.heroContent} ${!menuOpen ? 'hidden' : 'flex'} dropdown-menu-bg p-6 absolute top-20 right-0 mx-8 my-8 min-w-[140px] z-10 rounded-xl`}>
          <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`dropdown-menu ${location.pathname === nav.path ? 'nav-title-active' : 'nav-title-inactive'}`}
                onClick={() => setMenuOpen(false)}
              >
                <Link to={nav.path}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
