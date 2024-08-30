// import React, { useEffect, useRef, useState } from 'react';
// import Minimap from "../components/Minimap";
// import NavPane from "../components/NavigationPane";
// import SearchBar from '../components/SearchBar';
// import { IoClose, IoLayers } from 'react-icons/io5';
// import { FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
// import { BiSolidSearchAlt2 } from 'react-icons/bi';

// const Toolbar = ({ sections, onResize, onToggleNavPane, contentRef, onSearch, onNavigate, currentIndex, totalResults, isSearchBarVisible, toggleSearchBarVisibility }) => {
//   const [isNavPaneVisible, setIsNavPaneVisible] = useState(false);
//   const [navPaneWidth, setNavPaneWidth] = useState(20);
//   const [isMinimapVisible, setIsMinimapVisible] = useState(true);
//   const [isToolbarVisible, setIsToolbarVisible] = useState(true);
//   const lastScrollTop = useRef(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

//       if (isSearchBarVisible) {
//         // If search bar is visible, don't hide the toolbar
//         setIsToolbarVisible(true);
//       } else {
//         if (currentScrollTop > lastScrollTop.current) {
//           // Scrolling down
//           setIsToolbarVisible(false);
//         } else {
//           // Scrolling up
//           setIsToolbarVisible(true);
//         }
//       }

//       lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isSearchBarVisible]); // Depend on isSearchBarVisible to update on change

//   const toggleNavPaneVisibility = () => {
//     setIsNavPaneVisible(prev => {
//       const newVisibility = !prev;
//       onToggleNavPane(newVisibility ? navPaneWidth : 0);
//       return newVisibility;
//     });
//   };

//   const handleResize = (width) => {
//     setNavPaneWidth(width);
//     onResize(width);
//   };

//   const toggleMinimapVisibility = () => {
//     setIsMinimapVisible(prev => !prev);
//   };

//   const handleSearchBarToggle = () => {
//     toggleSearchBarVisibility();
//   };

//   return (
//     <div>
//       <div className={`toolbar ${isToolbarVisible ? 'toolbar-visible' : 'toolbar-hidden'}`}>
//         {!isSearchBarVisible && (
//           <>
//             <button
//               onClick={toggleNavPaneVisibility}
//               className={`icon-button ${isNavPaneVisible ? 'active' : ''}`}
//               aria-label={isNavPaneVisible ? 'Hide Navigation' : 'Show Navigation'}
//             >
//               <IoLayers className="icon-button-icon" />
//             </button>

//             <button
//               onClick={toggleMinimapVisibility}
//               className={`icon-button ${isMinimapVisible ? 'active' : ''}`}
//               aria-label={isMinimapVisible ? 'Hide Minimap' : 'Show Minimap'}
//             >
//               <FaMapMarkedAlt className="icon-button-icon" />
//             </button>
//           </>
//         )}

//         {isSearchBarVisible && (
//           <SearchBar
//             onSearch={onSearch}
//             onNavigate={onNavigate}
//             currentIndex={currentIndex}
//             totalResults={totalResults}
//             isVisible={isSearchBarVisible} // Pass visibility state to SearchBar
//           />
//         )}
//         <button
//           onClick={handleSearchBarToggle}
//           className={`icon-button ${isSearchBarVisible ? 'active' : ''}`}
//           aria-label={isSearchBarVisible ? 'Hide Search Bar' : 'Show Search Bar'}
//         >
//           {/* {isSearchBarVisible ? (
//             <IoClose className="icon-button-icon" />
//           ) : (
//             <BiSolidSearchAlt2 className="icon-button-icon" />
//           )} */}
//           <BiSolidSearchAlt2 className="icon-button-icon" />
//         </button>
//       </div>

//       {isNavPaneVisible && (
//         <NavPane sections={sections} onResize={handleResize} width={navPaneWidth} />
//       )}

//       {isMinimapVisible && (
//         <Minimap
//           contentRef={contentRef}
//           isVisible={isMinimapVisible}
//           onToggle={toggleMinimapVisibility}
//         />
//       )}
//     </div>
//   );
// };

// export default Toolbar;
import React, { useEffect, useRef, useState } from 'react';
import Minimap from "../components/Minimap";
import NavPane from "../components/NavigationPane";
import SearchBar from '../components/SearchBar';
import { IoClose, IoLayers } from 'react-icons/io5';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import '../assets/styles/Toolbar.css';

const Toolbar = ({ sections, onResize, onToggleNavPane, contentRef, onSearch, onNavigate, currentIndex, totalResults, isSearchBarVisible, toggleSearchBarVisibility }) => {
  const [isNavPaneVisible, setIsNavPaneVisible] = useState(false);
  const [navPaneWidth, setNavPaneWidth] = useState(20);
  const [isMinimapVisible, setIsMinimapVisible] = useState(true);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (isSearchBarVisible) {
        // If search bar is visible, don't hide the toolbar
        setIsToolbarVisible(true);
      } else {
        if (currentScrollTop > lastScrollTop.current) {
          // Scrolling down
          setIsToolbarVisible(false);
        } else {
          // Scrolling up
          setIsToolbarVisible(true);
        }
      }

      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchBarVisible]);

  const toggleNavPaneVisibility = () => {
    setIsNavPaneVisible(prev => {
      const newVisibility = !prev;
      onToggleNavPane(newVisibility ? navPaneWidth : 0);
      return newVisibility;
    });
  };

  const handleResize = (width) => {
    setNavPaneWidth(width);
    onResize(width);
  };

  const toggleMinimapVisibility = () => {
    setIsMinimapVisible(prev => !prev);
  };

  const handleSearchBarToggle = () => {
    toggleSearchBarVisibility();
  };

  const handleSearchBarClose = () => {
    toggleSearchBarVisibility();
  };

  return (
    <div>
      <div className={`toolbar ${isToolbarVisible ? 'toolbar-visible' : 'toolbar-hidden'}`}>
        {!isSearchBarVisible && (
          <>
            <button
              onClick={toggleNavPaneVisibility}
              className={`icon-button ${isNavPaneVisible ? 'active' : ''}`}
              aria-label={isNavPaneVisible ? 'Hide Navigation' : 'Show Navigation'}
            >
              <IoLayers />
            </button>

            <button
              onClick={toggleMinimapVisibility}
              className={`icon-button ${isMinimapVisible ? 'active' : ''}`}
              aria-label={isMinimapVisible ? 'Hide Minimap' : 'Show Minimap'}
            >
              <FaMapMarkedAlt />
            </button>

            <button
              onClick={handleSearchBarToggle}
              className={`icon-button ${isSearchBarVisible ? 'active' : ''}`}
              aria-label={isSearchBarVisible ? 'Hide Search Bar' : 'Show Search Bar'}
            >
              <BiSolidSearchAlt2 />
            </button>
          </>
        )}

        {isSearchBarVisible && (
          <SearchBar
            onSearch={onSearch}
            onNavigate={onNavigate}
            currentIndex={currentIndex}
            totalResults={totalResults}
            isVisible={isSearchBarVisible}
            onClose={handleSearchBarClose} // Pass the close handler
          />
        )}

        {isSearchBarVisible && (
          <button
            onClick={handleSearchBarToggle}
            className={`searchbar-close-button ${isSearchBarVisible ? 'active' : ''}`}
            aria-label={isSearchBarVisible ? 'Hide Search Bar' : 'Show Search Bar'}
          >
            <IoClose className="glow-close-icon" />
          </button>
        )}

      </div>

      {isNavPaneVisible && (
        <NavPane sections={sections} onResize={handleResize} width={navPaneWidth} />
      )}

      {isMinimapVisible && (
        <Minimap
          contentRef={contentRef}
          isVisible={isMinimapVisible}
          onToggle={toggleMinimapVisibility}
        />
      )}
    </div>
  );
};

export default Toolbar;
