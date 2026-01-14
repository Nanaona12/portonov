import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Fullstack Website Developer Intern",
    company: "PT JARI Information Technology",
    location: "Bandung, Indonesia",
    period: "Aug 2023 - Dec 2023",
    description:
      "Developed and maintained Laravel-based web applications. Improved front-end performance using Bootstrap and Vue.js, and optimized REST APIs, database indexing, and caching, resulting in up to a 30% improvement in load time. Collaborated closely with the UI/UX design team.",
    technologies: [
      "Laravel",
      "PHP",
      "Bootstrap",
      "Vue.js",
      "REST API",
      "MySQL"
    ]
  },
  {
    title: "Informatics Exam Supervisor Coordinator",
    company: "National Institute of Technology",
    location: "Bandung, Indonesia",
    period: "Mar 2022 - Jan 2025",
    description:
      "Managed and scheduled more than 30 exam sessions per semester and coordinated with 15-20 supervisors. Communicated with 20+ lecturers to ensure smooth technical exam operations. Accurately archived supervision and attendance reports using Google Workspace.",
    technologies: [
      "Google Workspace",
      "Coordination",
      "Scheduling",
      "Documentation"
    ]
  },
  {
    title: "Part-Time Coding Teacher",
    company: "Kalananti x UOB Ruang Guru",
    location: "Bandung, Indonesia",
    period: "Jul 2025 - Present",
    description:
      "Taught basic Python programming to more than 100 high school students using a project-based learning approach. Collaborated on curriculum development and guided students in building applications and understanding various Python algorithms.",
    technologies: [
      "Python",
      "Algorithms",
      "Project-Based Learning",
      "Teaching"
    ]
  },
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Bandung, Indonesia",
    period: "Oct 2023 - Present",
    description:
      "Managed end-to-end website development projects for various MSMEs, from requirement analysis and system design to development and deployment. Communicated directly with clients to define timelines and features while handling multiple projects in parallel with effective time management.",
    technologies: [
      "Web Development",
      "Client Communication",
      "Project Management",
      "Deployment"
    ]
  }
];


export const Experience = () => {
  useScrollAnimation();

  return (
    <section id="experience" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the experiences that shaped my career
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="glass card-3d glow-on-hover p-8 animate-on-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {exp.title}
                  </h3>
                  <h4 className="text-xl text-primary mb-4 font-semibold">
                    {exp.company}
                  </h4>
                  <div className="flex flex-wrap gap-4 mb-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};