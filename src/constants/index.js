import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  adobexd,
  docker,
  sab,
  groomelogo,
  ieee,
  texonic,
  groome, 
  ichatcs,
  jobit,
  tripguide,
  crowdfunding,
  threejs,
} from "../assets";

export const navLinks = [
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

const services = [
  {
    title: "UX Researcher",
    icon: web,
  },
  {
    title: "UI Designer",
    icon: mobile,
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
    title: "UI/UX Designer",
    company_name: "Groome Digital",
    icon: groomelogo,
    iconBg: "#FFFFFF",
    date: "Oct 2022 - Oct 2023",
    points: [
      "Individually designed booking and team management platform targeted on beauty and wellness industry ensuring both functionality and aesthetic appeal.",
      "Responsible for the end-to-end design process, from ideation to execution.",
      "Conducted user interviews focused on staff handling and appointments managements, especially targeting sri lankan users; Analyzed survey data and user feedback to design the platform.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "IEEE SL Inspire",
    icon: ieee,
    iconBg: "#FFF9F9",
    date: "May 2021 - Aug 2022",
    points: [
      "Responsible for developing and maintaining the website, troubleshoot issues, implement updates, and ensure that the website consistently reflected the dynamic nature of the organization.",
    ],
  },
  {
    title: "UI/UX Engineer Intern",
    company_name: "Texonic Information System Pvt Ltd",
    icon: texonic,
    iconBg: "#FFFFFF",
    date: "Aug 2020 - Feb 2021",
    points: [
      "Worked as sole UX/UI engineer for a range of projects collaborated with cross - functional teams to deliver tailored design solution for clients across diverse industries.",
      "Worked as sole UX/UI engineer for a range of projects collaborated with cross - functional teams to deliver tailored design solution for clients across diverse industries.",
      "Redesigned existing systems by improving overall user experience by identifying UX issues and proposing design recommendations result in increment of user engagement and satisfaction."
    ],
  },
  {
    title: "Creative Designer",
    company_name: "Share a Book",
    icon: sab,
    iconBg: "#E6DEDD",
    date: "April 2020 - June 2020",
    points: [
      "Responsible for brand identity design from concept to execution.",
      "Creative visualization, executing marketing campaigns, and crafting visually impactful designs that express compelling stories by merging creativity with strategic objectives."
    ],
  },
];

const projects = [
  {
    name: "Groome - Booking and Team Management Platform",
    description:
      "Booking and team management platform targeted on beauty and wellness industry",
    tags: [
      {
        name: "Adobe XD",
        color: "pink-text-gradient",
      },
    ],
    image: groome,
    source_code_link: "https://dribbble.com/shots/22048836-Booking-platform-for-salons-Client-Version-Landing-Page",
  },
  {
    name: "iChatCS",
    description:
      "A platform designed for companies across various industries to effortlessly connect their dedicated agents with their clients",
    tags: [
      {
        name: "Adobe XD",
        color: "pink-text-gradient",
      },
    ],
    image: ichatcs,
    source_code_link: "https://github.com/",
  },
  {
    name: "Crowd Funding Based Event Management System",
    description:
      "A project that is developed for crowd funding - based event organizing to understand the fan base for a particular event.",
    tags: [
      {
        name: "Adobe XD",
        color: "pink-text-gradient",
      },
      {
        name: "Java",
        color: "orange-text-gradient",
      },
      {
        name: "Android Studio",
        color: "green-text-gradient",
      },
    ],
    image: crowdfunding,
    source_code_link: "https://dribbble.com/shots/13933576-Online-Concert-Ticket-Booking",
  },
  {
    name: "Sapro Mart",
    description:
      "Online retail platform that connects any type of whole sellers and retailers in Sri Lanka to its users based on location.",
    tags: [
      {
        name: "Adobe XD",
        color: "pink-text-gradient",
      },
    ],
    image: ichatcs,
    source_code_link: "https://github.com/",
  },
  {
    name: "Food Mart - POS System",
    description:
      " an innovative Point of Sale system designed exclusively for restaurants, designed to streamline order management based on distinct sections and diverse locations.",
    tags: [
      {
        name: "Adobe XD",
        color: "pink-text-gradient",
      },
    ],
    image: ichatcs,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, projects };