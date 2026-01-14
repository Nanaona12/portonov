import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pmImages = import.meta.glob(
  "@/assets/projectimage/pm/*.png",
  { eager: true, import: "default" }
);

const sipoinImages = import.meta.glob(
  "@/assets/projectimage/sipoin/*.png",
  { eager: true, import: "default" }
);

const ieltsImages = import.meta.glob(
  "@/assets/projectimage/ieltshub/*.png",
  { eager: true, import: "default" }
);
const project1 = Object.values(pmImages)[0] as string;
const project2 = Object.values(sipoinImages)[0] as string;
const project3 = Object.values(ieltsImages)[0] as string;


export const Projects = () => {
  const projects = [
    {
      id: "1",
      title: "Project Management Platform",
      description: "A web-based project management platform for real-time project monitoring and team collaboration.",
      image: project1,
      technologies: ["React", "Node.js", "Three.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "2",
      title: "Sistem Pelanggaran Siswa (SIPOIN) / Student Violation Management System",
      description: "A web-based student violation management system that enables efficient and transparent handling of student disciplinary data.",
      image: project2,
      technologies: ["React", "Supabase", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "3",
      title: "IELTS Hub",
      description: "A web-based IELTS learning and practice platform featuring structured materials, practice tests, and evaluation tools.",
      image: project3,
      technologies: ["React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "REST API",
        "MySQL"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work combining creativity with cutting-edge technology
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Project Image */}
              <div className={`perspective-container animate-on-scroll ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="card-3d group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover Actions */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Button variant="floating" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className={`animate-on-scroll ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold group">
                    <span className="text-gradient">{project.title}</span>
                  </h3>
                  
                  <div className="glass p-6 rounded-xl">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techI) => (
                      <span 
                        key={techI}
                        className="px-4 py-2 glass rounded-full text-sm font-medium hover:bg-primary/20 hover:text-primary transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="hero" asChild>
                      <Link 
                        to={`/project/${project.id}`}
                        className="group"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};