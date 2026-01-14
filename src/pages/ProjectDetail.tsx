import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Code, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ProjectDetail = () => {
  const { id } = useParams();
  useScrollAnimation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

const projectImages = {
  ecommerce: Object.values(
    import.meta.glob('/src/assets/projectimage/pm/*.png', {
      eager: true,
      import: 'default',
    })
  ) as string[],

  sipoin: Object.values(
    import.meta.glob('/src/assets/projectimage/sipoin/*.png', {
      eager: true,
      import: 'default',
    })
  ) as string[],

  ieltshub: Object.values(
    import.meta.glob('/src/assets/projectimage/ieltshub/*.png', {
      eager: true,
      import: 'default',
    })
  ) as string[],
};

  const projectsData = [
    {
      id: "1",
      title: "Project Management Platform",
      description: "A web-based project management platform for real-time project monitoring and team collaboration.",
      longDescription:
        "Comprehensive project management platform designed to support real-time project monitoring, task management, and efficient team collaboration. This web application provides an interactive dashboard, task workflows, project progress analytics, and role-based access control systems to help teams manage complex projects. Built with a focus on usability, scalability, and performance, this platform is suitable for various industries.",

      image: projectImages.ecommerce[0],
      images: projectImages.ecommerce,

      technologies: [
        "Real-time project and task monitoring",
        "Team collaboration and activity logging",
        "Interactive project dashboard",
        "Task assignment and progress tracking",
        "Role-based access control system",
        "Responsive design for various devices"
      ],

      liveUrl: "#",
      githubUrl: "#",

      duration: "1 months",
      team: "1 developers",
      role: "Full-stack Developer ",

      challenges: [
        "Implementing real-time project updates using WebSocket",
        "Designing an intuitive dashboard to display complex project data",
        "Optimizing application performance to handle large volumes of project and task data",
        "Implementing a secure user access and role management system"
      ],

      features: [
        "Real-time project and task monitoring",
        "Team collaboration and activity logging",
        "Interactive project dashboard",
        "Task assignment and progress tracking",
        "Role-based access control system",
        "Responsive design for various devices"
      ],

      achievements: [
        "Improved project transparency and visibility for all team members",
        "Reduced project delays through real-time monitoring",
        "Enhanced team productivity and collaboration effectiveness",
        "Successfully supported management of multiple projects simultaneously"
      ]
    },
    {
      id: "2",
      title: "SIPOIN (Student Violation Management System)",
      description:
        "A web-based student violation management system for centralized recording, monitoring, and reporting.",
      longDescription:
        "SIPOIN is a web-based application designed to record and monitor student violations in a structured manner. The system helps schools manage violation data, student point records, and generate reports efficiently. The application was developed with a strong focus on usability, performance, and data accuracy.",
      image: projectImages.sipoin[0],
      images: projectImages.sipoin,
      technologies: [
        "Laravel",
        "Vue.js",
        "Bootstrap",
        "MySQL",
        "REST API",
        "Git"
      ],
      liveUrl: "#",
      githubUrl: "#",
      duration: "2 weeks",
      team: "1 developer",
      role: "Fullstack Web Developer",
      challenges: [
        "Designing an easy-to-use violation reporting workflow",
        "Optimizing database queries and overall performance",
        "Synchronizing data across different user roles"
      ],
      features: [
        "Student and violation data management",
        "Automatic violation point system",
        "Role-based access control (Admin, Teacher, Guardian)",
        "Violation reports and data recaps",
        "Violation monitoring dashboard"
      ],
      achievements: [
        "Accelerated the student violation recap process",
        "Reduced errors caused by manual record-keeping",
        "Improved the efficiency of school administrative processes"
      ]
    },
    {
      id: "3",
      title: "IELTS Hub",
      description:
        "A web-based IELTS learning and practice platform featuring structured materials, practice questions, and evaluation.",
      longDescription:
        "IELTS Hub is a web-based educational platform designed to help learners prepare for the IELTS exam. The application provides structured learning materials, practice questions, and an evaluation system to track user progress. The main focus of development was delivering an interactive and well-organized learning experience.",
      image: projectImages.ieltshub[0],
      images: projectImages.ieltshub,
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "REST API",
        "MySQL"
      ],
      liveUrl: "#",
      githubUrl: "#",
      duration: "4 months",
      team: "1 developer",
      role: "Fullstack Developer",
      challenges: [
        "Designing a clear and easy-to-understand learning content structure",
        "Creating a comfortable UI for long-term learning sessions",
        "Optimizing page performance and state management"
      ],
      features: [
        "IELTS content and material management",
        "Category-based practice questions",
        "User progress tracking",
        "Modern and responsive UI",
        "User data management"
      ],
      achievements: [
        "Increased user engagement",
        "Supported independent learning processes",
        "Delivered a consistent and user-friendly interface"
      ]
    }


  ];

  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-on-scroll">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild variant="hero">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button asChild variant="ghost" className="group">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="hero-bg absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Project Info */}
            <div className="animate-on-scroll">
              <h1 className="text-6xl font-bold mb-6">
                <span className="text-gradient">{project.title}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {project.longDescription}
              </p>
              
              <div className="flex gap-4 mb-8">
                <Button variant="hero" size="lg" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    Source Code
                  </a>
                </Button>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-4 rounded-xl text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{project.duration}</p>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="font-semibold">{project.team}</p>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                  <Code className="w-6 h-6 mx-auto mb-2 text-tertiary" />
                  <p className="text-sm text-muted-foreground">My Role</p>
                  <p className="font-semibold text-sm">{project.role}</p>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="animate-on-scroll">
              <div className="perspective-container">
                <div className="card-3d group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-floating"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            <span className="text-gradient">Technologies Used</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-6 py-3 glass rounded-full font-medium hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Challenges Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Key Features */}
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-bold mb-8">
                <span className="text-gradient">Key Features</span>
              </h3>
              <div className="space-y-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="glass p-4 rounded-xl hover:bg-card-glass/80 transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-bold mb-8">
                <span className="text-gradient">Technical Challenges</span>
              </h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="glass p-4 rounded-xl hover:bg-card-glass/80 transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-4 mt-2" />
                      <span className="font-medium">{challenge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            <span className="text-gradient">Project Achievements</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.achievements.map((achievement, i) => (
              <div key={i} className="text-center animate-on-scroll">
                <div className="glass p-8 rounded-2xl hover:bg-card-glass/80 transition-all duration-300 group">
                  <Award className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-semibold text-lg">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            <span className="text-gradient">Project Gallery</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.images.map((image, i) => (
              <div key={i} className="animate-on-scroll">
                <div className="perspective-container">
                  <div className="card-3d group">
                    <img 
                      src={image} 
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      onClick={() => {
                        setIndex(i);
                        setOpen(true);
                      }}
                    />

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={project.images.map((img) => ({ src: img }))}
      />

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-gradient">Interested in This Project?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can work together on similar projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Live Project
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/#contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;