import { Code, Palette, Zap, Globe, Database, Smartphone } from "lucide-react";

export const Skills = () => {
  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, Vue, Angular, TypeScript",
      color: "from-primary to-primary-glow"
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Node.js, Python, PostgreSQL, MongoDB",
      color: "from-secondary to-secondary-glow"
    },
    {
      icon: Globe,
      title: "Web & AI Technologies",
      description: "Next.js, Vite, Webpack, Docker, Pytorch, FastAPI, TensorFlow",
      color: "from-secondary to-tertiary"
    },
  ];

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient">My Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise across the full development stack with a focus on modern technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
          {skills.map((skill, i) => (
            <div 
              key={i} 
              className="card-3d glass p-8 rounded-2xl group hover:shadow-[0_25px_50px_-12px_hsl(var(--primary)/0.3)] transition-all duration-500 animate-on-scroll"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {skill.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};