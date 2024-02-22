import React from "react";
import { SectionWrapper } from "../hoc";
import SocialIcons from './SocialIcons';
import { styles } from "../styles";

const Footer = () => {
  return (
    // <div className="footer rounded-2xl" style={{ backgroundColor: '#ffffff05' }}>
    //   <div className={`flex flex-col items-center md:flex-row md:justify-between md:items-center sm:px-12 px-4 py-7`}>
    //     <SvgLogo className={`mb-6 sm:mb-0`} />
    //     <div className="text-center sm:text-right sm:mt-2">
    //       <h1 className="hidden sm:block" style={{ fontStyle: 'italic' }}>
    //         Let's Connect.
    //       </h1>
    //       <SocialIcons />
    //     </div>
    //   </div>

    <div className="footer">
      <div className={`flex flex-col items-center md:items-center sm:px-4 px-4 py-4`}>
        <h1 className={`${styles.heroContentA}, py-2`}>
          Let's Connect.
        </h1>
        <SocialIcons />
      </div>
      <div className="footer-content text-center mt-4">
        Designed and built by Thinu Harini <br />
        &#169; thinu-harini.github.io | All rights reserved
      </div>
    </div>
  )
}

export default Footer;
// export default SectionWrapper(Footer, "footer");