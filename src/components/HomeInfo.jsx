import { Link } from "react-router-dom";

const InfoBox = ({ text, link, btnText }) => (
  <div className='info-box'>
    <p className='font-medium sm:text-xl text-center'>{text}</p>
    <Link to={link} className={`neo-btn`}>
      {btnText}
    </Link>
  </div>
)

const renderContent = {
  1: (
    <InfoBox
      btnText="Shall we jump straight into my portfolio?"
      link="/projects"
    />

  ),
  2: (
    <InfoBox
      btnText="Or maybe some details about me first?"
      link="/about"
    />

  ),
  3: (
    <InfoBox
      btnText="Wanna know about my work history?"
      link="/experience"
    />
  ),
  4: (
    <InfoBox
      btnText="Let's get in touch amigo!"
      link="/contact"
    />
  ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo