import * as React from "react";
import { motion, useAnimation } from "framer-motion";

export const SvgLogo = (props) => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const controls6 = useAnimation();
  const controls7 = useAnimation();
  const controls8 = useAnimation();
  const controls9 = useAnimation();

  // Function to play animations in sequence
  const animateSequence = async () => {

    // Parallel animations
    await Promise.all([
      //t1 animate
      controls1.start({
        y: [0, 12.3],
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //t2 animate
      controls2.start({
        y: [0, 8.8],
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //t3 animate
      controls3.start({
        y: [0, 22.45],
        scaleY: 0.87,
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //H animate
      controls4.start({
        y: [0, -10],
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //hinu rotate
      controls5.start({
        y: [0, 16],
        rotateX: 90,
        transition: { duration: 0.6 }
      }),
      //arini rotate
      controls6.start({
        y: [0, -16],
        rotateX: 90,
        transition: { duration: 0.6 }
      }),
    ]);

    // Pause for a moment
    await new Promise((resolve) => setTimeout(resolve, 500));

    await Promise.all([
      //logo flick
      controls7.start({
        opacity: [0, 0.5],
        transition: { duration: 0.1, repeat: 4, type: "snap" }
      }),
    ]);

    await Promise.all([
      //logo visible
      controls7.start({
        opacity: [0, 1],
        transition: { duration: 1, ease: "linear" }
      }),
      //logo rotate
      controls7.start({
        rotateY: [0, 90],
        transition: { duration: 0.6, delay: 1, ease: "linear" },
      }),
      //th rotate
      controls8.start({
        rotateY: [0, 90],
        transition: { duration: 0.6, delay: 1, ease: "linear" },
      }),
    ]);

    await Promise.all([
      //DP rotate
      controls9.start({
        rotateY: [90, 0, 90],
        transition: { duration: 1.2, ease: "linear" },
      }),
      //logo rotate back
      controls7.start({
        rotateY: [90, 0],
        transition: { duration: 0.6, delay: 1.2, ease: "linear" },
      }),
      //th rotate back
      controls8.start({
        rotateY: [90, 0],
        transition: { duration: 0.6, delay: 1.2, ease: "linear" },
      }),
    ]);

    // Pause for a moment
    await new Promise((resolve) => setTimeout(resolve, 1500));

    //Reverse the animation
    await Promise.all([
      //logo flick
      controls7.start({
        opacity: [1, 0.4],
        transition: { duration: 0.1, repeat: 6, type: "snap" }
      }),
    ]);

    await Promise.all([
      //logo invisible
      controls7.start({
        opacity: [1, 0],
        transition: { duration: 1, ease: "linear" }
      }),
    ]);

    // Pause for a moment
    await new Promise((resolve) => setTimeout(resolve, 500));

    await Promise.all([
      //t1 animate
      controls1.start({
        y: [12.4, 0],
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //t2 animate
      controls2.start({
        y: [8.8, 0],
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //t3 animate
      controls3.start({
        y: [22.45, 0],
        scaleY: 1,
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //H animate
      controls4.start({
        y: [-10, 0],
        transition: { duration: 0.6, ease: "easeOut" }
      }),
      //hinu rotate
      controls5.start({
        y: [16, 0],
        rotateX: 0,
        transition: { duration: 0.6 }
      }),
      //arini rotate
      controls6.start({
        y: [16, 0],
        rotateX: 0,
        transition: { duration: 0.6 }
      }),
    ]);

    // Pause for a moment
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Repeat the entire sequence
    animateSequence();
  };

  // Trigger the animation sequence on component mount
  React.useEffect(() => {
    animateSequence();
  }, []); // Empty dependency array to ensure it runs only once on mount

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={142.482}
      height={70.845}
      viewBox="0 0 142.482 70.845"
      {...props}
      style={{
        "--text": "var(--logo-text)",
        "--text-stroke": "var(--logo-text-stroke)",
        "--background": "var(--logo-bg)",
        "--black-bg": "var(--logo-bg-black)",
      }}
    >
      <defs>
        <clipPath id="clip-path">
          <circle
            id="Ellipse_20"
            data-name="Ellipse 20"
            cx={35.165}
            cy={35.165}
            r={35.165}
            fill="#fff"
          />
        </clipPath>
        <clipPath id="clip-path-2">
          <circle
            id="Ellipse_9"
            data-name="Ellipse 9"
            cx={35.166}
            cy={35.166}
            r={35.166}
            fill="#7d8dff"
          />
        </clipPath>
      </defs>

      <g id="logo" transform="translate(-723 -374.668)">

        {/* DP */}
        <motion.g initial={{ rotateY: 90 }} animate={controls9}>
          <g id="l2"
            transform="translate(-10676 -7997.662)">
            <circle
              id="Ellipse_21"
              data-name="Ellipse 21"
              cx={35.165}
              cy={35.165}
              r={35.165}
              transform="translate(11399 8372.332)"
              style={{ fill: "var(--background)" }}
            />
            <g
              id="Mask_Group_19"
              data-name="Mask Group 19"
              transform="translate(11399 8372.332)"
              clipPath="url(#clip-path)"
            >
              <image
                id="img"
                width={75.354}
                height={100.413}
                transform="translate(-5.024 -8.038)"
                xlinkHref="dp.png"
              />
            </g>
          </g>
        </motion.g>

        {/* logo */}
        <motion.g id="l1Wrapper" initial={{ opacity: 0 }} animate={controls7} >
          <g id="l1" transform="translate(-977 352.668)">
            <circle
              id="Ellipse_18"
              data-name="Ellipse 18"
              cx={35.166}
              cy={35.166}
              r={35.166}
              transform="translate(1700 22)"
              style={{ fill: "var(--background)" }}
            />
            <g
              id="Mask_Group_8"
              data-name="Mask Group 8"
              transform="translate(1700 22)"
              clipPath="url(#clip-path-2)"
            >
              <rect
                id="Rectangle_17"
                data-name="Rectangle 17"
                width={44.832}
                height={39.073}
                transform="translate(12.75 16.041)"
                style={{ fill: "var(--black-bg)" }}
              />
              <rect
                id="Rectangle_16"
                data-name="Rectangle 16"
                width={29.202}
                height={43.598}
                transform="translate(20.564 29.613)"
                style={{ fill: "var(--black-bg)" }}
              />
              <rect
                id="Rectangle_11"
                data-name="Rectangle 11"
                width={4.89}
                height={12.92}
                transform="translate(32.69 35.792)"
                style={{ fill: "var(--black-bg)" }}
              />
            </g>
            <g
              id="Ellipse_7"
              data-name="Ellipse 7"
              transform="translate(1700 22)"
              fill="none"
              stroke="var(--background)"
              strokeWidth={4}
            >
              <circle cx={35.166} cy={35.166} r={35.166} stroke="none" />
              <circle cx={35.166} cy={35.166} r={33.166} fill="none" />
            </g>
          </g>
        </motion.g>

        {/* ARINI */}
        <motion.g animate={controls6}>
          <text
            id="h2"
            transform="translate(772.482 438.513)"
            style={{ fill: "var(--text)" }}
            fontSize={31}
            fontFamily="GillSansMT-Bold, Gill Sans MT"
            fontWeight={700}
          >
            <tspan x={0} y={0}>
              {"ARINI"}
            </tspan>
          </text>
        </motion.g>

        {/* hinu */}
        <motion.g animate={controls5}>
          <text
            id="t2"
            transform="translate(770.254 406.93)"
            style={{ fill: "var(--text)" }}
            fontSize={31}
            fontFamily="GillSansMT-Bold, Gill Sans MT"
            fontWeight={700}
          >
            <tspan x={0} y={0}>
              {"HINU"}
            </tspan>
          </text>
        </motion.g>

        <motion.g id="th" animate={controls8} style={{ fill: "var(--text-stroke)" }}>
          {/* H */}
          <g id="h1" transform="translate(746.201 416.746)">
            <motion.g animate={controls4} >
              <path
                id="Path_6"
                data-name="Path 6"
                d="M0,0H6.26l-.1,19.75L0,24.01Z"
                transform="translate(18.059 0.004)"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M0,0H6.26V24.01L0,20.45Z"
                transform="translate(-0.002 0.004)"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M0,0H14V4.528H0Z"
                transform="translate(5.181 7.392)"
              />
            </motion.g>
          </g>

          {/* T */}
          <g id="t1" transform="translate(0 10)" style={{ fill: "var(--text-stroke)" }}>
            <motion.g animate={controls3}>
              <path
                id="Path_3"
                data-name="Path 3"
                d="M0,17.877H3.62V30.765l-1.806.873L0,30.765Z"
                transform="translate(756.53 371.154)"
              />
            </motion.g>
            <motion.g animate={controls2}>
              <path
                id="Path_2"
                data-name="Path 2"
                d="M0,0H3.62V12.53H0Z"
                transform="translate(756.529 379.23)"
              />
            </motion.g>
            <motion.g animate={controls1}>
              <path
                id="Path_1"
                data-name="Path 1"
                d="M0-6.895H24.014v5.4H0Z"
                transform="translate(746.201 382.433)"
              />
            </motion.g>
          </g>
        </motion.g>
      </g >
    </svg >
  )
}
export { SvgLogo as ReactComponent }