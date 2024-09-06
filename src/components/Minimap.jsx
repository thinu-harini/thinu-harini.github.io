// import React, { useEffect, useRef, useState } from 'react';
// import '../assets/styles/Minimap.css';

// const Minimap = ({ contentRef, isVisible }) => {
//   const minimapRef = useRef(null);
//   const minimapSizeRef = useRef(null);
//   const viewerRef = useRef(null);
//   const minimapContentRef = useRef(null);
//   const [scale, setScale] = useState(0.1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startY, setStartY] = useState(0);
//   const [startScrollY, setStartScrollY] = useState(0);

//   useEffect(() => {
//     if (!contentRef.current) {
//       console.warn('contentRef.current is not available');
//       return;
//     }

//     const extractStyles = () => {
//       const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
//         .map(style => style.outerHTML)
//         .join('\n');
//       return styles;
//     };

//     const injectContent = () => {
//       if (!minimapContentRef.current) return;

//       const contentHtml = contentRef.current.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
//       const stylesHtml = extractStyles();

//       const iframeDoc = minimapContentRef.current.contentWindow.document;
//       iframeDoc.open();
//       iframeDoc.write(`
//         <html>
//           <head>
//             <style>${stylesHtml}</style>
//           </head>
//           <body>${contentHtml}</body>
//         </html>
//       `);
//       iframeDoc.close();
//     };

//     injectContent();
//   }, [contentRef]);

//   useEffect(() => {
//     const getDimensions = () => {
//       if (!contentRef.current || !minimapRef.current || !minimapContentRef.current) return;

//       const bodyWidth = contentRef.current.clientWidth;
//       const bodyRatio = contentRef.current.clientHeight / bodyWidth;
//       const winRatio = window.innerHeight / window.innerWidth;

//       minimapRef.current.style.width = '15%';

//       const realScale = minimapRef.current.clientWidth / bodyWidth;

//       setScale(realScale);

//       minimapSizeRef.current.style.paddingTop = `${bodyRatio * 100}%`;
//       viewerRef.current.style.paddingTop = `${winRatio * 115}%`;

//       minimapContentRef.current.style.transform = `scale(${realScale})`;
//       minimapContentRef.current.style.width = `${100 / realScale}%`;
//       minimapContentRef.current.style.height = `${100 / realScale}%`;
//     };

//     const trackScroll = () => {
//       if (viewerRef.current) {
//         viewerRef.current.style.transform = `translateY(${window.scrollY * scale}px)`;
//       }
//     };

//     if (contentRef.current) {
//       getDimensions();
//       window.addEventListener('scroll', trackScroll);
//       window.addEventListener('resize', getDimensions);
//     }

//     return () => {
//       window.removeEventListener('scroll', trackScroll);
//       window.removeEventListener('resize', getDimensions);
//     };
//   }, [scale, contentRef]);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartY(e.clientY);
//     setStartScrollY(window.scrollY);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const deltaY = e.clientY - startY;
//     window.scrollTo(0, startScrollY + deltaY / scale);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     } else {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     }
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging]);

//   const handleMinimapClick = (e) => {
//     if (!minimapRef.current || !contentRef.current) return;

//     const minimapRect = minimapRef.current.getBoundingClientRect();
//     const minimapClickY = e.clientY - minimapRect.top;
//     const contentHeight = contentRef.current.clientHeight;
//     const clickRatio = minimapClickY / minimapRef.current.clientHeight;
//     const scrollTop = clickRatio * (contentHeight - window.innerHeight);

//     window.scrollTo(0, scrollTop);
//   };

//   return (
//     <div>
//       <div
//         className={`minimap-container ${isVisible ? 'visible' : 'hidden'}`}
//         ref={minimapRef}
//         onClick={handleMinimapClick}
//       >
//         <div className="minimap-size" ref={minimapSizeRef}></div>
//         <div
//           className="minimap-viewer"
//           ref={viewerRef}
//           onMouseDown={handleMouseDown}
//           style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
//         ></div>
//         <iframe className="minimap-content" ref={minimapContentRef}></iframe>
//       </div>
//     </div>
//   );
// };

// export default Minimap;



import React, { useRef, useState, useEffect } from 'react';
import '../assets/styles/Minimap.css';

const NAVBAR_HEIGHT = 90;

const Minimap = () => {
  const minimapRef = useRef(null);
  const minimapContentRef = useRef(null);
  const viewerRef = useRef(null);
  const [realScale, setRealScale] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollY, setStartScrollY] = useState(0);

  useEffect(() => {
    const getDimensions = () => {
      const bodyWidth = document.body.clientWidth;
      const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
      const minimapHeight = minimapRef.current.clientHeight;

      // Adjust realScale based on minimapHeight and bodyHeight
      const scale = Math.min(minimapHeight / bodyHeight, 1); // Prevent scaling larger than 1
      setRealScale(scale);

      minimapRef.current.style.width = '15%'; // Fixed width for the minimap container

      // Adjust content scaling
      minimapContentRef.current.style.transform = `scale(${scale})`;
      minimapContentRef.current.style.width = `${(100 / scale)}%`; // Adjust width based on scale
      minimapContentRef.current.style.height = `${(100 / scale)}%`; // Adjust height based on scale

      viewerRef.current.style.paddingTop = `${(window.innerHeight - NAVBAR_HEIGHT) * scale}px`;
      minimapRef.current.style.paddingTop = `${bodyHeight * scale}px`;
    };

    const trackScroll = () => {
      viewerRef.current.style.transform = `translateY(${(window.scrollY) * realScale}px)`;
    };

    getDimensions();
    window.addEventListener('scroll', trackScroll);
    window.addEventListener('resize', getDimensions);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('resize', getDimensions);
    };
  }, [realScale]);

  useEffect(() => {

    const excludeElements = (html) => {
      // Use a temporary DOM parser to manipulate the HTML string
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Remove elements by class or ID
      doc.querySelectorAll('.navbar, .toolbar, .scroll-button-container, .accessibility-menu-container').forEach(element => element.remove());

      // Return the modified HTML
      return doc.documentElement.outerHTML;
    };

    const html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const modifiedHtml = excludeElements(html);

    const iframeDoc = minimapContentRef.current.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(modifiedHtml);
    iframeDoc.close();
  }, []);

  const handleMinimapClick = (event) => {
    const minimap = minimapRef.current;
    const clickX = event.clientX - minimap.getBoundingClientRect().left;
    const clickY = event.clientY - minimap.getBoundingClientRect().top;

    // Calculate the target scroll position
    const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
    const minimapHeight = minimap.clientHeight;
    const targetScrollY = (clickY / minimapHeight) * bodyHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartY(event.clientY);
    setStartScrollY(window.scrollY);
    event.preventDefault(); // Prevent text selection during drag
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaY = event.clientY - startY;
      const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
      const minimapHeight = minimapRef.current.clientHeight;
      const newScrollY = startScrollY + (deltaY / minimapHeight) * bodyHeight;

      window.scrollTo({
        top: newScrollY,
        behavior: 'smooth',
      });

      // Update viewer position
      viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="minimap__container"
      ref={minimapRef}
    // onClick={handleMinimapClick}
    // onMouseDown={handleMouseDown}
    // onMouseMove={handleMouseMove}
    // onMouseUp={handleMouseUp}
    // onMouseLeave={handleMouseUp} // Ensure dragging stops if the mouse leaves the window
    >
      <div className="minimap__size" />
      <div className="minimap__viewer" ref={viewerRef} />
      <iframe className="minimap__content" ref={minimapContentRef} title="Minimap" />
    </div>
  );
};

export default Minimap;


