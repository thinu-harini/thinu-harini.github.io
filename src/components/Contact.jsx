import { Suspense, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

import { Canvas } from '@react-three/fiber';
import Loader from "../components/Loader";
import Girl from "../models/Girl.jsx";

const Contact = () => {

  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { alert, showAlert, hideAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const adjustGirlForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [-0.1, -0.1, 0];

    if (window.innerWidth < 768) {
      screenScale = [2.5, 2.5, 2.5];
      screenPosition = [0, -2.5, 0];
    } else {
      screenScale = [4, 4, 4];
      screenPosition = [0.55, -3.8, -4];
    }

    return [screenScale, screenPosition, rotation]
  }
  const [girlScale, girlPosition, girlRotation] = adjustGirlForScreenSize();

  //reset the animation after form submit
  useEffect(() => {
    if (currentAnimation === 'thankful') {
      const timeoutId = setTimeout(() => {
        setCurrentAnimation('idle');
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentAnimation]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }) //enable enter data
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('thankful');

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Thinu Harini",
          from_email: form.email,
          to_email: "thinu.harini@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        //Success message
        showAlert({
          show: true,
          text: "Thank you. I will get back to you as soon as possible.",
          type: "success",
        });

        //Hide alert and clear form
        setTimeout(() => {
          hideAlert();
        }, [3000])

        setForm({
          name: "",
          email: "",
          message: "",
        });

      }).catch((error) => {
        setIsLoading(false);
        console.log(error);
        //Show error message
        showAlert({
          show: true,
          text: "Something went wrong. Please try again.",
          type: "danger",
        });

        setTimeout(() => {
          hideAlert();
        }, [3000])
      })
  }

  const handleFocus = () => setCurrentAnimation('idle');
  const handleBlur = () => setCurrentAnimation('idle');

  return (
    <div className={`motion-container xl:mt-12 gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='contact-card'
      >
        <p className={`${styles.sectionSubText}`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText}`}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-10 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className={`${styles.contactText}`}>Your Name</span>
            <input
              type='text'
              name='name'
              className='input-field'
              placeholder='John Doe'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='flex flex-col'>
            <span className={`${styles.contactText}`}>Your email</span>
            <input
              type='email'
              name='email'
              className='input-field'
              placeholder='john.doe@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='flex flex-col'>
            <span className={`${styles.contactText}`}>Your Message</span>
            <textarea
              rows={3}
              name='message'
              className='input-field'
              placeholder='Let me know how I can help you!'
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type='submit'
            className='button py-3 px-8 w-fit'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <Canvas
          camera={{ near: 0.1, far: 1000, fov: 45, position: [-1, 0, 7] }}
        // camera={{
        //   position: [0, 0, 5],
        //   fov: 75,
        //   near: 0.1,
        //   far: 1000,
        // }}
        >
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={1} />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={0.5}
          />

          <pointLight position={[-1, 0.5, 1]} intensity={1} />
          <pointLight position={[-1, -2, 1]} intensity={1} />

          <Suspense fallback={<Loader />}>

            <Girl
              currentAnimation={currentAnimation}
              scale={girlScale}
              position={girlPosition}
              rotation={girlRotation}
            />
          </Suspense>
        </Canvas>
      </motion.div>

      <div className="alert">
        {alert.show && <Alert {...alert} />}
        {/* <Alert {...alert} /> */}
      </div>

    </div>
  )
}

export default SectionWrapper(Contact, "contact")