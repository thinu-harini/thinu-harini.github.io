import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='ball-container flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='ball' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  )
}

export default Tech;
// export default SectionWrapper(Tech, "");