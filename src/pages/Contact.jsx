import { Suspense, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';

import { SectionWrapper } from "../hoc";
import { Canvas } from '@react-three/fiber';
import CanvasLoader from "../components/CanvasLoader.jsx";
import ContactGirlModel from "../models/ContactGirl.jsx";
import { textVariant } from "../utils/motion.js";
import '../assets/styles/Contact.css';

const Contact = () => {

  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", });
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const adjustGirlForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [-0.1, -0.2, 0];

    if (window.innerWidth < 768) {
      screenScale = [3.4, 3.4, 3.4];
      screenPosition = [0, -2.6, 0.2];
    } else {
      screenScale = [4.4, 4.4, 4.4];
      screenPosition = [0.55, -3.8, -3];
    }
    return [screenScale, screenPosition, rotation]
  }
  const [girlScale, girlPosition, girlRotation] = adjustGirlForScreenSize();

  //reset the animation after form submit
  useEffect(() => {
    if (currentAnimation === 'cheer' || currentAnimation === 'sad') {
      const timeoutId = setTimeout(() => {
        setCurrentAnimation('idle');
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [currentAnimation]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }) //enable enter data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        setCurrentAnimation('cheer');
        showAlert({
          show: true,
          // text: "Thank you. I will get back to you as soon as possible.",
          type: "success",
        });

        //Hide alert and clear form
        setTimeout(() => { hideAlert(); }, 4000);
        setForm({ name: "", email: "", message: "", });

      }).catch((error) => {
        setIsLoading(false);
        console.log(error);
        //Show error message
        setCurrentAnimation('sad');
        showAlert({
          show: true,
          // text: "Failed to send your message. Please try again or email me directly.",
          type: "danger",
        });
      })
  }

  const handleFocus = () => setCurrentAnimation('idle');
  const handleBlur = () => setCurrentAnimation('idle');

  return (
    <div>
      <motion.div
        variants={textVariant()}
        className='sm:mt-12 mt-16'
      >
        <h1 className="section-heading">Contact.</h1>
      </motion.div>

      <div className="motion-container xl:mt-0 mt-6 gap-10 overflow-hidden">
        <motion.div
          className='contact-left-div'
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className={`contact-text xl:mb-2 mb-2`}>Your Name</span>
              <input
                type='text'
                name='name'
                className="contact-text input-field"
                placeholder='John Doe'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className='flex flex-col'>
              <span className="contact-text xl:mb-2 mb-2">Your email</span>
              <input
                type='email'
                name='email'
                className="contact-text input-field"
                placeholder='john.doe@gmail.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className='flex flex-col'>
              <span className="contact-text xl:mb-2 mb-2">Your Message</span>
              <textarea
                rows={3}
                name='message'
                className="contact-text input-field"
                placeholder='Let me know how I can help you!'
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button
              type='submit'
              className="button-text button w-fit"
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </motion.div>

        <motion.div
          className='contact-right-div xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <Canvas
            camera={{ near: 0.1, far: 1000, fov: 45, position: [-1, 0, 7] }}
          >
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={1} />
            <hemisphereLight
              skyColor='#b1e1ff'
              groundColor='#000000'
              intensity={0.5}
            />
            <pointLight position={[0, 0.5, 1]} intensity={0.5} />
            <pointLight position={[-1, -2, 1]} intensity={1} />

            <Suspense fallback={<CanvasLoader />}>
              <ContactGirlModel
                currentAnimation={currentAnimation}
                scale={girlScale}
                position={girlPosition}
                rotation={girlRotation}
              />
            </Suspense>
          </Canvas>
        </motion.div>

        <div className="alert">
          {alert.show && <Alert {...alert} hideAlert={hideAlert} />}
          {/* <Alert {...alert} /> */}
        </div>

      </div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")