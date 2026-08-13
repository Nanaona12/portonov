const pmImages = import.meta.glob(
  "@/assets/projectimage/pm/*.png",
  {
    eager: true,
    import: "default",
  }
);

const sipoinImages = import.meta.glob(
  "@/assets/projectimage/sipoin/*.png",
  {
    eager: true,
    import: "default",
  }
);

const ieltsImages = import.meta.glob(
  "@/assets/projectimage/ieltshub/*.png",
  {
    eager: true,
    import: "default",
  }
);

const dagangPintarImages = import.meta.glob(
  "@/assets/projectimage/dagangpintar/*.png",
  {
    eager: true,
    import: "default",
  }
);

const fellaskyImages = import.meta.glob(
  "@/assets/projectimage/fellasky/*.png",
  {
    eager: true,
    import: "default",
  }
);

/* =========================
   PROJECT IMAGES
========================= */

const project1Images = Object.values(pmImages) as string[];
const project2Images = Object.values(sipoinImages) as string[];
const project3Images = Object.values(ieltsImages) as string[];
const project4Images = Object.values(dagangPintarImages) as string[];
const project5Images = Object.values(fellaskyImages) as string[];

/* =========================
   TYPES
========================= */

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
};

/* =========================
   PORTFOLIO PROFILE
========================= */

export const portfolioRole =
  "Project Management Enthusiast | Web Developer";

export const portfolioTitle =
  "Portofolio Noviona Marathus Sholihah";

export const portfolioSubtitle =
  "Project management and web development portfolio showcasing experience in coordinating projects, developing web solutions, and delivering digital products.";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",

    title: "Project Management Platform",

    category: "Project Management / Web Development",

    description:
      "A web-based project management platform designed to support project monitoring, task coordination, team collaboration, and progress tracking throughout the development process.",

    image: project1Images[0],

    images: project1Images,

    technologies: [
      "React",
      "Node.js",
      "Three.js",
      "PostgreSQL",
    ],

    liveUrl: "#",

    githubUrl: "#",
  },

  {
    id: "2",

    title:
      "SIPOIN — Sistem Pelanggaran Siswa",

    category: "Education / Web Application",

    description:
      "A web-based student violation management system designed to help schools manage disciplinary records in a more structured, transparent, and efficient way.",

    image: project2Images[0],

    images: project2Images,

    technologies: [
      "React",
      "TypeScript",
      "Supabase",
    ],

    liveUrl: "#",

    githubUrl: "#",
  },

  {
    id: "3",

    title: "IELTS Hub",

    category: "Education / Learning Platform",

    description:
      "A web-based IELTS learning platform that provides structured learning materials, practice tests, and evaluation features to support users throughout their IELTS preparation.",

    image: project3Images[0],

    images: project3Images,

    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST API",
      "MySQL",
    ],

    liveUrl: "#",

    githubUrl: "#",
  },

  {
    id: "4",

    title: "Dagang Pintar",

    category: "SME / E-Commerce / Web Application",

    description:
      "A web-based business management platform designed for small and medium-sized businesses to manage products, sales transactions, inventory, and business performance more efficiently.",

    image: project4Images[0],

    images: project4Images,

    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST API",
      "MySQL",
    ],

    liveUrl: "https://dagangpintar.app",

    githubUrl: "#",
  },

  {
    id: "5",

    title: "Fellasky Konveksi",

    category: "SME / Company Profile / Web Application",

    description:
      "A web-based platform developed to support the digital presence and product promotion of a textile and garment business.",

    image: project5Images[0],

    images: project5Images,

    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST API",
      "MySQL",
    ],

    liveUrl: "https://fellaskyproject.vercel.app",

    githubUrl: "#",
  },
];