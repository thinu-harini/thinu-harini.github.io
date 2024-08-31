import React from 'react';
import { Hero, Education, Experience } from '../components';
import ScrollButton from '../components/ScrollButton';

const About = () => {

  return (
    <React.Fragment>
      <ScrollButton />
      <Hero />
      <Education />
      <Experience />
    </React.Fragment>
  );
};

export default About;
