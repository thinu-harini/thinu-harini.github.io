import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';

import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { SvgLogo } from "./SvgLogo.jsx";
import MusicPlayer from './MusicPlayer.jsx';
import { Toggle } from "./Toggle";

const Navbar = ({ isDark, handleToggleChange }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    const handleResize = () => {
      setToggle(false);
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
    <nav className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 ${scrolled ? "nav-bg" : "bg-transparent"}`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <SvgLogo className='w-28 h-auto' />
        </Link>

        {/* menu button */}
        {/* <div className='md:hidden flex flex-col md:flex-row items-end justify-end'> */}
        <div className='md:flex-row flex items-center gap-4'>

          {/* {Toggle component */}
          <Toggle isChecked={isDark} handleChange={handleToggleChange} />

          {/* Sound Button */}
          <MusicPlayer />

          <div className='md:hidden '>
            {toggle ? (
              <IoClose
                size={32}
                className={`menu-icon object-contain cursor-pointer`}
                onClick={() => setToggle(!toggle)}
              />
            ) : (
              <HiMenuAlt3
                size={32}
                className={`menu-icon object-contain cursor-pointer`}
                onClick={() => setToggle(!toggle)}
              />
            )}
          </div>
        </div>

        {/* Links */}
        <ul className="list-none hidden md:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`nav-title ${active === nav.title ? 'nav-title-active' : 'nav-title-inactive'}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* dropdown menu */}
        <div ref={dropdownRef} className={`${!toggle ? 'hidden' : 'flex'} dropdown-menu-bg p-6 absolute top-20 right-0 mx-8 my-2 min-w-[140px] z-10 rounded-xl`}>
          <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`dropdown-menu ${active === nav.title ? 'nav-title-active' : 'nav-title-inactive'}`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(nav.title);
                }}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
