import { useRef, useState } from "react";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Footer = () => {
  return (

    <div className="footer">
      <div className="footer-content">
        Designed and built by Thinu Harini <br />
        &#169; thinu-harini.github.io | All rights reserved
      </div>
    </div>
  )
}

export default Footer;
// export default SectionWrapper(Footer, "footer");