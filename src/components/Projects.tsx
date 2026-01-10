import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";

export const Projects = () => {
  const projects = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with 3D product visualization, real-time inventory, and advanced analytics.",
      image: project1,
      technologies: ["React", "Node.js", "Three.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "2",
      title: "Sistem Pelanggaran Siswa (SIPOIN)",
      description: "Sistem pelanggaran siswa berbasis web yang memungkinkan pengelolaan data pelanggaran secara efisien dan transparan.",
      image: project2,
      technologies: ["React", "Supabase", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "3",
      title: "3D Portfolio Website",
      description: "Interactive portfolio website featuring WebGL animations and immersive 3D experiences.",
      image: project1,
      technologies: ["Three.js", "React", "GSAP", "Blender"],
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