import React, { useState } from 'react';
import { IoIosColorPalette } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { styles } from '../styles';

const ReaderToolbar = ({ onClose, currentTheme, onChangeTheme }) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const toggleThemeMenu = () => setIsThemeMenuOpen(!isThemeMenuOpen);

  return (
    <div className="reader-toolbar">
      <button onClick={onClose} aria-label="Close Reader View">
        <IoClose />
      </button>

      <button
        onClick={toggleThemeMenu}
        aria-label="Theme"
        className={isThemeMenuOpen ? 'active' : ''}
      >
        <IoIosColorPalette />
      </button>

      {isThemeMenuOpen && (
        <div className="theme-menu">
          <button
            onClick={() => onChangeTheme('light-theme')}
            className={currentTheme === 'light-theme' ? 'active' : ''}
            aria-label="Light Mode"
          >
            <div className={styles.buttonText}>Light Mode</div>
          </button>
          <button
            onClick={() => onChangeTheme('dark-theme')}
            className={currentTheme === 'dark-theme' ? 'active' : ''}
            aria-label="Dark Mode"
          >
            <div className={styles.buttonText}>Dark Mode</div>
          </button>
          <button
            onClick={() => onChangeTheme('sepia-theme')}
            className={currentTheme === 'sepia-theme' ? 'active' : ''}
            aria-label="Sepia Mode"
          >
            <div className={styles.buttonText}>Sepia Mode</div>
          </button>
          <button
            onClick={() => onChangeTheme('contrast-theme')}
            className={currentTheme === 'contrast-theme' ? 'active' : ''}
            aria-label="Contrast Mode"
          >
            <div className={styles.buttonText}>Contrast Mode</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReaderToolbar;


// import React, { useState } from 'react';
// import { IoIosColorPalette } from 'react-icons/io';
// import { IoClose } from 'react-icons/io5';
// import { styles } from '../styles';

// const ReaderToolbar = ({ onClose, currentTheme, onChangeTheme }) => {
//   const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

//   const toggleThemeMenu = () => setIsThemeMenuOpen(prev => !prev);

//   return (
//     <div className="reader-toolbar">
//       <button onClick={onClose} aria-label="Close Reader View">
//         <IoClose />
//       </button>

//       <button
//         onClick={toggleThemeMenu}
//         aria-label="Change Theme"
//         className={isThemeMenuOpen ? 'active' : ''}
//       >
//         <IoIosColorPalette />
//       </button>

//       {isThemeMenuOpen && (
//         <div className="theme-menu">
//           {['light-theme', 'dark-theme', 'sepia-theme', 'contrast-theme'].map(theme => (
//             <button
//               key={theme}
//               onClick={() => onChangeTheme(theme)}
//               className={currentTheme === theme ? 'active' : ''}
//               aria-label={`${theme.replace('-theme', '').replace('contrast', 'High Contrast')} Mode`}
//             >
//               <div className={styles.buttonText}>
//                 {theme.replace('-theme', '').replace('contrast', 'High Contrast')} Mode
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReaderToolbar;

