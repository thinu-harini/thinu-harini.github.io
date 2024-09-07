import React, { useState } from 'react';
import '../assets/styles/AccessibilityMenu.css';
import { IoClose } from 'react-icons/io5';

const PageStructureMenu = ({ headings, links, onClose }) => {
  const [activeTab, setActiveTab] = useState('headings');

  return (
    <div className="page-structure-menu">
      <div className="page-structure-menu-heading">
        Page Structure
        <button className="page-structure-menu-close-button" onClick={onClose}>
          <IoClose size={24} />
        </button>
      </div>
      <div className="accessibility-tabs">
        <button
          className={`accessibility-tab ${activeTab === 'headings' ? 'active' : ''}`}
          onClick={() => setActiveTab('headings')}
        >
          Headings
        </button>
        <button
          className={`accessibility-tab ${activeTab === 'links' ? 'active' : ''}`}
          onClick={() => setActiveTab('links')}
        >
          Links
        </button>
      </div>
      <div className="page-structure-content">
        {activeTab === 'headings' && (
          <div className="headings-content">
            {headings.map((heading, index) => (
              <div className='mb-1' key={index} style={{ marginLeft: `${(heading.level - 1) * 20}px` }}>
                {heading.text}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'links' && (
          <div className="links-content">
            {links.map((link, index) => (
              <div key={index}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageStructureMenu;