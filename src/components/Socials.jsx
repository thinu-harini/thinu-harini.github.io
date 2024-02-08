import React from 'react';
import { FaLinkedin, FaBehanceSquare, FaMediumM } from 'react-icons/fa';
import { PiDribbbleLogoFill } from "react-icons/pi";
import { IoMail } from "react-icons/io5";
import { socials } from '../constants';
import './Socials.css';

const Socials = ({ socials }) => {
  return (
    <div className='flex flex-row items-start gap-4'>
      <IoMail className="icon mail" />
      <FaLinkedin className="icon linkedin" />
      <PiDribbbleLogoFill className="icon dribbble" />
      <FaBehanceSquare className="icon behance" />
      <FaMediumM className="icon medium" />
    </div>
  )
}

// function Socials() {
//   return (
//     <div className='flex flex-row items-start gap-4'>
//       <IoMail className="icon" />
//       <FaLinkedin className="icon" />
//       <PiDribbbleLogoFill className="icon" />
//       <FaBehanceSquare className="icon" />
//       <FaMediumM className="icon" />
//     </div>
//   )
// }

export default Socials;