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
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a fresh graduate in Informatics Engineering with interests in Artificial Intelligence, 
              Full-Stack Web Development, and Project Management. I have experience in developing web 
              applications, managing projects, and coordinating teams, with a strong focus on delivering 
              efficient, scalable, and high-quality solutions.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With over 5 years of experience, I transform ideas into stunning 
              digital realities that engage users and drive results.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "3+", label: "Years Experience" },
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
                <div className="w-42 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center text-6xl font-bold text-primary-foreground">
                  NMS
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Noviona Marathus Sholihah</h3>
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