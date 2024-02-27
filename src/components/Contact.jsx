import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

const Contact = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { alert, showAlert, hideAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
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
        showAlert({
          show: true,
          text: "Thank you. I will get back to you as soon as possible.",
          type: "success",
        });

        //Hide alert and clear form
        setTimeout(() => {
          hideAlert();
          setform({ name: '', email: '', message: '' });
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
            />
          </label>

          <button
            type='submit'
            className='button py-3 px-8 w-fit'
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>

      <div className="alert">
        {alert.show && <Alert {...alert} />}
        {/* <Alert {...alert} /> */}
      </div>

      <div className='absolute z-20 bottom-20 flex justify-center items-center' style={{ left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div
          animate={{
            y: [0, 24, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
          onClick={scrollToTop}
        >
          <TbArrowBigUpLinesFilled size={32} color="#fff" />
        </motion.div>
      </div>

    </div>
  )
}

export default SectionWrapper(Contact, "contact")