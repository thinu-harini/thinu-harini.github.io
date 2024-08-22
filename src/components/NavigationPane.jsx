// import React from 'react';
// import { Link } from 'react-scroll';
// import { sections } from './sections';
// // import { Link } from 'react-router-dom';

// const NavPane = () => {
//   return (
//     <div className="navigation-pane overflow-y-auto">
//       <h3 className="content-text font-semibold">Navigation</h3>
//       <ul className="mt-4">
//         {sections.map((section, index) => (
//           <li key={index} className="mb-2">
//             <Link
//               to={section.id}
//               smooth={true}
//               duration={500}
//               className="navigation-pane-content content-text"
//             >
//               {section.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NavPane;

import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { sections } from './sections';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons

const NavPane = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`navigation-pane overflow-y-auto ${isVisible ? '' : 'hidden'}`}>
      <button
        onClick={toggleVisibility}
        className="icon-button absolute top-2 right-2 z-10"
        aria-label={isVisible ? 'Close Navigation' : 'Open Navigation'}
      >
        {isVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <h3 className="content-text font-semibold">Navigation</h3>
      <ul className="mt-4">
        {sections.map((section, index) => (
          <li key={index} className="mb-2">
            <Link
              to={section.id}
              smooth={true}
              duration={500}
              className="navigation-pane-content content-text"
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavPane;

