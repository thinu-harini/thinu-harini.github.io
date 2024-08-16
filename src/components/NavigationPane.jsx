// components/Minimap.js
import React from 'react';
// import { Link } from 'react-scroll';
import { sections } from './sections'; // Assume this file contains section data
import { Link } from 'react-router-dom';

const NavPane = () => {
  return (
    <div className="fixed right-0 top-0 w-48 bg-gray-800 text-white p-4 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold">Navigation</h3>
      <ul className="mt-4">
        {sections.map((section, index) => (
          <li key={index} className="mb-2">
            <Link
              to={section.id}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:underline"
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


// npm install react - scroll
// // src/components/Minimap.jsx
// import React from 'react';
// import { Link, Element } from 'react-scroll';

// const Minimap = ({ sections }) => {
//   return (
//     <div style={{ position: 'fixed', top: '0', right: '0', width: '200px', height: '100%', border: '1px solid #ccc', overflow: 'auto' }}>
//       {sections.map((section, index) => (
//         <div key={index} style={{ padding: '5px', cursor: 'pointer' }}>
//           <Link
//             to={section.id}
//             smooth={true}
//             duration={500}
//             style={{ display: 'block', padding: '5px', background: '#f0f0f0', margin: '2px 0' }}
//           >
//             {section.title}
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Minimap;

