export const About = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="animate-on-scroll">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-gradient">About Me</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a passionate full-stack developer with a love for creating immersive 
              digital experiences. Specializing in modern web technologies, 3D graphics, 
              and interactive design.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With over 5 years of experience, I transform ideas into stunning 
              digital realities that engage users and drive results.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "5+", label: "Years Experience" },
                { number: "30+", label: "Happy Clients" },
                { number: "∞", label: "Cups of Coffee" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Card */}
          <div className="perspective-container animate-on-scroll">
            <div className="card-3d glass p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center text-6xl font-bold text-primary-foreground">
                  JD
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">John Doe</h3>
                  <p className="text-primary font-semibold mb-4">Full Stack Developer</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['React', 'Node.js', 'Three.js', 'TypeScript'].map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};