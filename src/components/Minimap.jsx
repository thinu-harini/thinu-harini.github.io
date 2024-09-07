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



























// import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
// import '../assets/styles/Minimap.css';

// const NAVBAR_HEIGHT = 90;

// const Minimap = () => {
//   const minimapRef = useRef(null);
//   const minimapContentRef = useRef(null);
//   const viewerRef = useRef(null);
//   const [realScale, setRealScale] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startY, setStartY] = useState(0);
//   const [startScrollY, setStartScrollY] = useState(0);

//   useEffect(() => {
//     const getDimensions = () => {
//       const bodyWidth = document.body.clientWidth;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;

//       // Adjust realScale based on minimapHeight and bodyHeight
//       const scale = Math.min(minimapHeight / bodyHeight, 1); // Prevent scaling larger than 1
//       setRealScale(scale);

//       minimapRef.current.style.width = '15%'; // Fixed width for the minimap container

//       // Adjust content scaling
//       minimapContentRef.current.style.transform = `scale(${scale})`;
//       minimapContentRef.current.style.width = `${(100 / scale)}%`; // Adjust width based on scale
//       minimapContentRef.current.style.height = `${(100 / scale)}%`; // Adjust height based on scale

//       viewerRef.current.style.paddingTop = `${(window.innerHeight - NAVBAR_HEIGHT) * scale}px`;
//       minimapRef.current.style.paddingTop = `${bodyHeight * scale}px`;
//     };

//     const trackScroll = () => {
//       viewerRef.current.style.transform = `translateY(${(window.scrollY) * realScale}px)`;
//     };

//     getDimensions();
//     window.addEventListener('scroll', trackScroll);
//     window.addEventListener('resize', getDimensions);

//     return () => {
//       window.removeEventListener('scroll', trackScroll);
//       window.removeEventListener('resize', getDimensions);
//     };
//   }, [realScale]);

//   // useEffect(() => {

//   //   const html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

//   //   const iframeDoc = minimapContentRef.current.contentWindow.document;
//   //   iframeDoc.open();
//   //   iframeDoc.write(html);
//   //   iframeDoc.close();
//   // }, []);

//   // useEffect(() => {
//   //   const content = document.querySelector('.content').innerHTML;
//   //   const iframeDoc = minimapContentRef.current.contentWindow.document;
//   //   const iframeHead = iframeDoc.head;
//   //   const iframeBody = iframeDoc.body;

//   //   // Injecting styles from main document
//   //   const styleSheets = Array.from(document.styleSheets);
//   //   styleSheets.forEach((styleSheet) => {
//   //     try {
//   //       if (styleSheet.href) {
//   //         const link = iframeDoc.createElement('link');
//   //         link.rel = 'stylesheet';
//   //         link.href = './src/index.css';
//   //         iframeHead.appendChild(link);
//   //       } else {
//   //         const style = iframeDoc.createElement('style');
//   //         const rules = Array.from(styleSheet.cssRules || []);
//   //         rules.forEach((rule) => {
//   //           style.appendChild(iframeDoc.createTextNode(rule.cssText));
//   //         });
//   //         iframeHead.appendChild(style);
//   //       }
//   //     } catch (e) {
//   //       console.warn('Unable to access stylesheet:', e);
//   //     }
//   //   });

//   //   iframeDoc.open();
//   //   iframeDoc.write(`
//   //     <html>
//   //       <head>
//   //         <style>
//   //           body { margin: 0;
//   //            padding: 20;
//   //            overflow: hidden;
//   //            color:#fff;
//   //            }
//   //         </style>
//   //       </head>
//   //       <body>
//   //         ${content}
//   //       </body>
//   //     </html>
//   //   `);
//   //   iframeDoc.close();
//   // }, []);

//   // useEffect(() => {
//   //   // Get only the content, excluding unwanted elements like navbars, footers, etc.
//   //   const content = document.querySelector('.content').innerHTML;
//   //   const iframeDoc = minimapContentRef.current.contentWindow.document;
//   //   iframeDoc.open();
//   //   iframeDoc.write(`
//   //     <html>
//   //       <head>
//   //         <style>
//   //           body { margin: 0; padding: 10; overflow: hidden; }
//   //         </style>
//   //       </head>
//   //       <body>
//   //         ${content}
//   //       </body>
//   //     </html>
//   //   `);
//   //   iframeDoc.close();
//   // }, []);


//   useEffect(() => {

//     const excludeElements = (html) => {
//       // Use a temporary DOM parser to manipulate the HTML string
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, 'text/html');

//       // Remove elements by class or ID
//       doc.querySelectorAll('.navbar, .toolbar, .scroll-button-container, .accessibility-menu-container').forEach(element => element.remove());

//       // Return the modified HTML
//       return doc.documentElement.outerHTML;
//     };

//     const html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
//     const modifiedHtml = excludeElements(html);

//     const iframeDoc = minimapContentRef.current.contentWindow.document;
//     iframeDoc.open();
//     iframeDoc.write(modifiedHtml);
//     iframeDoc.close();
//   }, []);

//   // useLayoutEffect(() => {
//   //   const content = document.querySelector('.content');
//   //   if (content) {
//   //     const clonedContent = content.cloneNode(true);

//   //     // Remove unnecessary elements
//   //     clonedContent.querySelectorAll('.toolbar, .scroll-button').forEach(el => el.remove());

//   //     // Apply styles to images
//   //     clonedContent.querySelectorAll('img').forEach(img => {
//   //       img.style.maxWidth = '100%'; // Ensure images fit within their container
//   //       img.style.height = 'auto';   // Maintain aspect ratio
//   //     });

//   //     const html = clonedContent.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
//   //     const iframeDoc = minimapContentRef.current.contentWindow.document;
//   //     iframeDoc.open();
//   //     iframeDoc.write(html);
//   //     iframeDoc.close();
//   //   } else {
//   //     console.error('Content element not found');
//   //   }
//   // }, []);

//   const handleMinimapClick = (event) => {
//     const minimap = minimapRef.current;
//     const clickX = event.clientX - minimap.getBoundingClientRect().left;
//     const clickY = event.clientY - minimap.getBoundingClientRect().top;

//     // Calculate the target scroll position
//     const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//     const minimapHeight = minimap.clientHeight;
//     const targetScrollY = (clickY / minimapHeight) * bodyHeight;

//     window.scrollTo({
//       top: targetScrollY,
//       behavior: 'smooth',
//     });
//   };

//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     setStartY(event.clientY);
//     setStartScrollY(window.scrollY);
//     event.preventDefault(); // Prevent text selection during drag
//   };

//   const handleMouseMove = (event) => {
//     if (isDragging) {
//       const deltaY = event.clientY - startY;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;
//       const newScrollY = startScrollY + (deltaY / minimapHeight) * bodyHeight;

//       window.scrollTo({
//         top: newScrollY,
//         behavior: 'smooth',
//       });

//       // Update viewer position
//       viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className="minimap__container"
//       ref={minimapRef}
//       onClick={handleMinimapClick}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp} // Ensure dragging stops if the mouse leaves the window
//     >
//       <div className="minimap__size" />
//       <div className="minimap__viewer" ref={viewerRef} />
//       <iframe className="minimap__content" ref={minimapContentRef} title="Minimap" />
//     </div>
//   );
// };

// export default Minimap;






















// import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
// import '../assets/styles/Minimap.css'; // Your minimap-specific styles

// const NAVBAR_HEIGHT = 90;

// const Minimap = () => {
//   const minimapRef = useRef(null);
//   const minimapContentRef = useRef(null);
//   const viewerRef = useRef(null);
//   const [realScale, setRealScale] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startY, setStartY] = useState(0);
//   const [startScrollY, setStartScrollY] = useState(0);

//   useEffect(() => {
//     const getDimensions = () => {
//       const bodyWidth = document.body.clientWidth;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;

//       // Adjust realScale based on minimapHeight and bodyHeight
//       const scale = Math.min(minimapHeight / bodyHeight, 1); // Prevent scaling larger than 1
//       setRealScale(scale);

//       minimapRef.current.style.width = '15%'; // Fixed width for the minimap container

//       // Adjust content scaling
//       minimapContentRef.current.style.transform = `scale(${scale})`;
//       minimapContentRef.current.style.width = `${(100 / scale)}%`; // Adjust width based on scale
//       minimapContentRef.current.style.height = `${(100 / scale)}%`; // Adjust height based on scale

//       viewerRef.current.style.paddingTop = `${(window.innerHeight - NAVBAR_HEIGHT) * scale}px`;
//       minimapRef.current.style.paddingTop = `${bodyHeight * scale}px`;
//     };

//     const trackScroll = () => {
//       viewerRef.current.style.transform = `translateY(${(window.scrollY) * realScale}px)`;
//     };

//     getDimensions();
//     window.addEventListener('scroll', trackScroll);
//     window.addEventListener('resize', getDimensions);

//     return () => {
//       window.removeEventListener('scroll', trackScroll);
//       window.removeEventListener('resize', getDimensions);
//     };
//   }, [realScale]);

//   useEffect(() => {
//     const updateIframeContent = () => {
//       const content = document.querySelector('.content').innerHTML;
//       const iframeDoc = minimapContentRef.current.contentWindow.document;
//       iframeDoc.open();
//       iframeDoc.write(`
//       <html>
//         <head>

//           <style>
//             body
//             { margin: 0;
//             padding: 20;
//             overflow: hidden;
//             color:#fff;
//       }
//             .casestudy-heading {
//   color: var(--head-text);
//   font-weight: bold;
// }

// .casestudy-subheading {
//   color: var(--sub-text);
//   font-weight: bold;
//   margin-top: 16px;
// }

// .casestudy-text {
//   color: var(--content);
// }
//     .casestudy-heading {
//     --base-font-size: 36px;
//     --base-line-height: 68px;
//   }

//   .casestudy-subheading {
//     --base-font-size: 24px;
//     --base-line-height: 68px;
//   }

//   .casestudy-text {
//     --base-font-size: 16px;
//     --base-line-height: 38px;
//   }

//           </style>
//         </head>
//         <body>
//           ${content}
//         </body>
//       </html>
//     `);
//       iframeDoc.close();
//     }

//     updateIframeContent();

//     // Listen for changes in the color mode and update iframe content
//     const handleColorModeChange = () => {
//       updateIframeContent();
//     };

//     window.addEventListener('color-mode-change', handleColorModeChange);

//     return () => {
//       window.removeEventListener('color-mode-change', handleColorModeChange);
//     };
//   }, []);

//   const handleMinimapClick = (event) => {
//     const minimap = minimapRef.current;
//     const clickX = event.clientX - minimap.getBoundingClientRect().left;
//     const clickY = event.clientY - minimap.getBoundingClientRect().top;

//     // Calculate the target scroll position
//     const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//     const minimapHeight = minimap.clientHeight;
//     const targetScrollY = (clickY / minimapHeight) * bodyHeight;

//     window.scrollTo({
//       top: targetScrollY,
//       behavior: 'smooth',
//     });
//   };

//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     setStartY(event.clientY);
//     setStartScrollY(window.scrollY);
//     event.preventDefault(); // Prevent text selection during drag
//   };

//   const handleMouseMove = (event) => {
//     if (isDragging) {
//       const deltaY = event.clientY - startY;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;
//       const newScrollY = startScrollY + (deltaY / minimapHeight) * bodyHeight;

//       window.scrollTo({
//         top: newScrollY,
//         behavior: 'smooth',
//       });

//       // Update viewer position
//       viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className="minimap__container"
//       ref={minimapRef}
//       onClick={handleMinimapClick}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp} // Ensure dragging stops if the mouse leaves the window
//     >
//       <div className="minimap__size" />
//       <div className="minimap__viewer" ref={viewerRef} />
//       <iframe className="minimap__content" ref={minimapContentRef} title="Minimap" />
//     </div>
//   );
// };

// export default Minimap;



































// import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
// import '../assets/styles/Minimap.css';

// const NAVBAR_HEIGHT = 90;

// const Minimap = () => {
//   const minimapRef = useRef(null);
//   const minimapContentRef = useRef(null);
//   const viewerRef = useRef(null);
//   const [realScale, setRealScale] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startY, setStartY] = useState(0);
//   const [startScrollY, setStartScrollY] = useState(0);

//   useLayoutEffect(() => {
//     const getDimensions = () => {
//       const bodyWidth = document.body.clientWidth;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;

//       // Adjust realScale based on minimapHeight and bodyHeight
//       const scale = Math.min(minimapHeight / bodyHeight, 1); // Prevent scaling larger than 1
//       setRealScale(scale);

//       minimapRef.current.style.width = '15%'; // Fixed width for the minimap container

//       // Adjust content scaling
//       minimapContentRef.current.style.transform = `scale(${scale})`;
//       minimapContentRef.current.style.width = `${(100 / scale)}%`; // Adjust width based on scale
//       minimapContentRef.current.style.height = `${(100 / scale)}%`; // Adjust height based on scale

//       viewerRef.current.style.paddingTop = `${(window.innerHeight - NAVBAR_HEIGHT) * scale}px`;
//       minimapRef.current.style.paddingTop = `${bodyHeight * scale}px`;
//     };

//     const trackScroll = () => {
//       if (viewerRef.current) {
//         viewerRef.current.style.transform = `translateY(${(window.scrollY) * realScale}px)`;
//       }
//     };

//     getDimensions();
//     window.addEventListener('scroll', trackScroll);
//     window.addEventListener('resize', getDimensions);

//     return () => {
//       window.removeEventListener('scroll', trackScroll);
//       window.removeEventListener('resize', getDimensions);
//     };
//   }, [realScale]);

//   useLayoutEffect(() => {
//     const html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

//     const iframeDoc = minimapContentRef.current.contentWindow.document;
//     iframeDoc.open();
//     iframeDoc.write(html);
//     iframeDoc.close();

//     const style = iframeDoc.createElement('style');
//     style.textContent = `
//     .navbar, .toolbar, .scroll-button-container, .accessibility-menu-container {
//       display: none !important;
//     }
//   `;
//     iframeDoc.head.appendChild(style);
//   }, []);

//   const handleMinimapClick = (event) => {
//     const minimap = minimapRef.current;
//     const clickX = event.clientX - minimap.getBoundingClientRect().left;
//     const clickY = event.clientY - minimap.getBoundingClientRect().top;

//     // Calculate the target scroll position
//     const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//     const minimapHeight = minimap.clientHeight;
//     const targetScrollY = (clickY / minimapHeight) * bodyHeight;

//     window.scrollTo({
//       top: targetScrollY,
//       behavior: 'smooth',
//     });
//   };

//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     setStartY(event.clientY);
//     setStartScrollY(window.scrollY);
//     event.preventDefault(); // Prevent text selection during drag
//   };

//   const handleMouseMove = (event) => {
//     if (isDragging) {
//       const deltaY = event.clientY - startY;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;
//       const newScrollY = startScrollY + (deltaY / minimapHeight) * bodyHeight;

//       window.scrollTo({
//         top: newScrollY,
//         behavior: 'smooth',
//       });

//       // Update viewer position
//       viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className="minimap__container"
//       ref={minimapRef}
//       onClick={handleMinimapClick}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp} // Ensure dragging stops if the mouse leaves the window
//     >
//       <div className="minimap__size" />
//       <div className="minimap__viewer" ref={viewerRef} />
//       <iframe className="minimap__content" ref={minimapContentRef} title="Minimap" src="about:blank" />

//     </div>
//   );
// };

// export default Minimap;








// import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
// import '../assets/styles/Minimap.css';
// import throttle from 'lodash/throttle';

// const NAVBAR_HEIGHT = 90;

// const Minimap = () => {
//   const minimapRef = useRef(null);
//   const minimapContentRef = useRef(null);
//   const viewerRef = useRef(null);
//   const [realScale, setRealScale] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startY, setStartY] = useState(0);
//   const [startScrollY, setStartScrollY] = useState(0);

//   const getDimensions = useCallback(() => {
//     const bodyWidth = document.body.clientWidth;
//     const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//     const minimapHeight = minimapRef.current.clientHeight;

//     const scale = Math.min(minimapHeight / bodyHeight, 1);
//     setRealScale(scale);

//     minimapRef.current.style.width = '15%';

//     minimapContentRef.current.style.transform = `scale(${scale})`;
//     minimapContentRef.current.style.width = `${(100 / scale)}%`;
//     minimapContentRef.current.style.height = `${(100 / scale)}%`;

//     viewerRef.current.style.paddingTop = `${(window.innerHeight - NAVBAR_HEIGHT) * scale}px`;
//     minimapRef.current.style.paddingTop = `${bodyHeight * scale}px`;
//   }, []);

//   const trackScroll = useCallback(() => {
//     if (viewerRef.current) {
//       viewerRef.current.style.transform = `translateY(${(window.scrollY) * realScale}px)`;
//     }
//   }, [realScale]);

//   useLayoutEffect(() => {
//     getDimensions();
//     window.addEventListener('scroll', trackScroll);

//     return () => {
//       window.removeEventListener('scroll', trackScroll);
//     };
//   }, [getDimensions, trackScroll]);

//   useEffect(() => {
//     const handleResize = throttle(() => {
//       getDimensions();
//     }, 200);

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [getDimensions]);


//   useLayoutEffect(() => {
//     const html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
//     // const html = document.documentElement.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
//     // Ensure to keep only essential parts for minimap


//     const iframeDoc = minimapContentRef.current.contentWindow.document;
//     iframeDoc.open();
//     iframeDoc.write(html);
//     iframeDoc.close();

//     const style = iframeDoc.createElement('style');
//     style.textContent = `
//     .navbar, .toolbar, .scroll-button-container, .accessibility-menu-container {
//       display: none !important;
//     }
//   `;
//     iframeDoc.head.appendChild(style);
//   }, []);

//   const handleMinimapClick = (event) => {
//     const minimap = minimapRef.current;
//     const clickX = event.clientX - minimap.getBoundingClientRect().left;
//     const clickY = event.clientY - minimap.getBoundingClientRect().top;

//     // Calculate the target scroll position
//     const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//     const minimapHeight = minimap.clientHeight;
//     const targetScrollY = (clickY / minimapHeight) * bodyHeight;

//     window.scrollTo({
//       top: targetScrollY,
//       behavior: 'smooth',
//     });
//   };


//   const handleTouchStart = (event) => {
//     setIsDragging(true);
//     setStartY(event.touches[0].clientY);
//     setStartScrollY(window.scrollY);
//     event.preventDefault();
//   };

//   const handleTouchMove = throttle((event) => {
//     if (isDragging) {
//       const deltaY = event.touches[0].clientY - startY;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;
//       const newScrollY = startScrollY + (deltaY / minimapHeight) * bodyHeight;

//       window.scrollTo({
//         top: newScrollY,
//         behavior: 'smooth',
//       });

//       viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
//     }
//   }, 16);

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     setStartY(event.clientY);
//     setStartScrollY(window.scrollY);
//     event.preventDefault(); // Prevent text selection during drag
//   };

//   const handleMouseMove = (event) => {
//     if (isDragging) {
//       const deltaY = event.clientY - startY;
//       const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
//       const minimapHeight = minimapRef.current.clientHeight;
//       const newScrollY = startScrollY + (deltaY / minimapHeight) * bodyHeight;

//       window.scrollTo({
//         top: newScrollY,
//         behavior: 'smooth',
//       });

//       // Update viewer position
//       viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className="minimap__container"
//       ref={minimapRef}
//       onClick={handleMinimapClick}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp} // Ensure dragging stops if the mouse leaves the window
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div className="minimap__size" />
//       <div className="minimap__viewer" ref={viewerRef} />
//       <iframe className="minimap__content" ref={minimapContentRef} title="Minimap" src="about:blank" />

//     </div>
//   );
// };

// export default Minimap;










import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import '../assets/styles/Minimap.css';
import throttle from 'lodash/throttle';

const NAVBAR_HEIGHT = 90;

const Minimap = () => {
  const minimapRef = useRef(null);
  const minimapContentRef = useRef(null);
  const viewerRef = useRef(null);
  const [realScale, setRealScale] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollY, setStartScrollY] = useState(0);

  const getDimensions = useCallback(() => {
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
    const minimapHeight = minimapRef.current.clientHeight;

    // Change this line to adjust the scale as needed
    const scale = 0.1; // Fixed scale for example, change as needed
    setRealScale(scale);

    minimapRef.current.style.width = '15%';

    minimapContentRef.current.style.transform = `scale(${scale})`;
    minimapContentRef.current.style.width = `${(100 / scale)}%`;
    minimapContentRef.current.style.height = `${(100 / scale)}%`;

    viewerRef.current.style.paddingTop = `${(window.innerHeight - NAVBAR_HEIGHT) * scale}px`;
    minimapRef.current.style.paddingTop = `${bodyHeight * scale}px`;
  }, []);

  const trackScroll = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.style.transform = `translateY(${(window.scrollY) * realScale}px)`;
    }
  }, [realScale]);

  useLayoutEffect(() => {
    getDimensions();
    window.addEventListener('scroll', trackScroll);

    return () => {
      window.removeEventListener('scroll', trackScroll);
    };
  }, [getDimensions, trackScroll]);

  useEffect(() => {
    const handleResize = throttle(() => {
      getDimensions();
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getDimensions]);

  useLayoutEffect(() => {
    const html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    const iframeDoc = minimapContentRef.current.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    const style = iframeDoc.createElement('style');
    style.textContent = `
    .navbar, .toolbar, .scroll-button-container, .accessibility-menu-container {
      display: none !important;
    }
  `;
    iframeDoc.head.appendChild(style);
  }, []);

  const handleMinimapClick = (event) => {
    const minimap = minimapRef.current;
    const clickX = event.clientX - minimap.getBoundingClientRect().left;
    const clickY = event.clientY - minimap.getBoundingClientRect().top;

    const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
    const minimapHeight = minimap.clientHeight;
    const targetScrollY = (clickY / minimapHeight) * bodyHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const handleTouchStart = (event) => {
    setIsDragging(true);
    setStartY(event.touches[0].clientY);
    setStartScrollY(window.scrollY);
    event.preventDefault();
  };

  const handleTouchMove = throttle((event) => {
    if (isDragging) {
      const deltaY = event.touches[0].clientY - startY;
      const bodyHeight = document.body.clientHeight - NAVBAR_HEIGHT;
      const minimapHeight = minimapRef.current.clientHeight;
      const newScrollY = startScrollY + (deltaY / minimapHeight) * bodyHeight;

      window.scrollTo({
        top: newScrollY,
        behavior: 'smooth',
      });

      viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
    }
  }, 16);

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartY(event.clientY);
    setStartScrollY(window.scrollY);
    event.preventDefault();
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

      viewerRef.current.style.transform = `translateY(${deltaY * realScale}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="minimap__container"
      ref={minimapRef}
      onClick={handleMinimapClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="minimap__size" />
      <div className="minimap__viewer" ref={viewerRef} />
      <iframe className="minimap__content" ref={minimapContentRef} title="Minimap" src="about:blank" />
    </div>
  );
};

export default Minimap;

