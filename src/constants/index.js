import {
  javascript,
  html,
  css,
  figma,
  adobexd,

  groome,
  ichatcs,
  crowdfunding,

} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  // {
  //   id: "about",
  //   title: "About",
  // },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const education = [
  {
    degree: "Bachelor of Science (Hons.) in Information Technology",
    place: "University of Moratuwa",
  },
  {
    degree: "Comprehensive Master Java Developer Professional Program",
    place: "Institute of Java and Software Engineering",
  },
  {
    degree: "G.C.E. Advanced Level - Science Stream",
    place: "R/Ferguson High School",
  },
];

const technologies = [
  {
    name: "Adobe XD",
    icon: adobexd,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
];

const experiences = [
  {
    tab_name: "Groome",
    title: "UI/UX Designer",
    company_name: "Groome Digital",
    date: "Oct 2022 - Oct 2023",
    points: [
      "Individually designed booking and team management platform targeted on beauty and wellness industry ensuring both functionality and aesthetic appeal.",
      "Responsible for the end-to-end design process, from ideation to execution.",
      "Conducted user interviews focused on staff handling and appointments managements, especially targeting sri lankan users; Analyzed survey data and user feedback to design the platform.",
    ],
  },
  {
    tab_name: "IEEE",
    title: "Web Developer",
    company_name: "IEEE SL Inspire",
    date: "May 2021 - Aug 2022",
    points: [
      "Responsible for developing and maintaining the website, troubleshoot issues, implement updates, and ensure that the website consistently reflected the dynamic nature of the organization.",
    ],
  },
  {
    tab_name: "Texonic",
    title: "UI/UX Engineer Intern",
    company_name: "Texonic Information System Pvt Ltd",
    date: "Aug 2020 - Feb 2021",
    points: [
      "Worked as sole UX/UI engineer for a range of projects collaborated with cross - functional teams to deliver tailored design solution for clients across diverse industries.",
      "Redesigned existing systems by improving overall user experience by identifying UX issues and proposing design recommendations result in increment of user engagement and satisfaction."
    ],
  },
  {
    tab_name: "Share a Book",
    title: "Creative Designer",
    company_name: "Share a Book",
    date: "April 2020 - June 2020",
    points: [
      "Responsible for brand identity design from concept to execution.",
      "Creative visualization, executing marketing campaigns, and crafting visually impactful designs that express compelling stories by merging creativity with strategic objectives."
    ],
  },
];

// tab names for smaller screens
export const tabNamesForSmallScreens = [
  "03.",
  "02.",
  "01.",
  "00."
];

const projects = [
  {
    name: "Groome",
    description:
      "A platform to book appointments and and manage the team targeted on beauty and wellness industry.",
    tags: [
      {
        name: "Adobe XD",
      },
    ],
    image: groome,
    case_study_link: "/case-study-groome",
    ui_link: "/case-study-groome",
  },
  {
    name: "iChatCS",
    description:
      "A platform designed for companies across various industries to effortlessly connect their dedicated agents with their clients.",
    tags: [
      {
        name: "Adobe XD",
      },
    ],
    image: ichatcs,
    // case_study_link: "/case-study-groome",
    ui_link: "https://github.com/",
  },
  {
    name: "Event Planning System",
    description:
      "A project that is developed for crowd funding - based event management to understand the fan base for a particular event.",
    tags: [
      {
        name: "Adobe XD",
      },
      {
        name: "Java",
      },
    ],
    image: crowdfunding,
    // case_study_link: "/case-study-groome",
    ui_link: "https://dribbble.com/shots/13933576-Online-Concert-Ticket-Booking",
  },
  {
    name: "Sapro Mart",
    description:
      "An online retail platform that connects any type of whole sellers and retailers in Sri Lanka to its users based on location.",
    tags: [
      {
        name: "Adobe XD",
      },
    ],
    image: ichatcs,
    case_study_link: "/case-study-groome",
    ui_link: "https://dribbble.com/shots/13933576-Online-Concert-Ticket-Booking",
  },
  {
    name: "Food Mart - POS System",
    description:
      "A Point of Sale system designed exclusively for restaurants to streamline order management based on distinct sections and diverse locations.",
    tags: [
      {
        name: "Adobe XD",
      },
    ],
    image: ichatcs,
    // case_study_link: "/case-study-groome",
    ui_link: "https://dribbble.com/shots/13933576-Online-Concert-Ticket-Booking",
  },
];

export { education, technologies, experiences, projects };