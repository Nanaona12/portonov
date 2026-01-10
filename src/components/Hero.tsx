import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg-3d.jpg";

export const Hero = () => {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="hero-bg absolute inset-0" />
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60" 
             style={{ transform: 'translateZ(0px)' }} />
        <div className="floating-delayed absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-secondary to-tertiary rounded-lg rotate-45 opacity-50" 
             style={{ transform: 'translateZ(0px)' }} />
        <div className="floating-slow absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-r from-tertiary to-primary rounded-full opacity-40" 
             style={{ transform: 'translateZ(0px)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="perspective-container">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-on-scroll">
            <span className="text-gradient">Noviona Marathus</span>
            <br />
            <span className="text-foreground">Sholihah</span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-on-scroll">
          AI Engineer • Fullstack Developer • Project Manager
        </p>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-on-scroll">
          Fresh graduate Teknik Informatika dengan minat pada Artificial Intelligence, 
          Fullstack Development dan Project Management
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-on-scroll">
          <Button variant="hero" size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            Lihat Portfolio
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Hubungi Saya
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12 animate-on-scroll">
          {[
            { Icon: Github, href: "https://github.com" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/noviona-marathus-sholihah-19a46b197/" },
            { Icon: Mail, href: "mailto:nmarathuss@gmail.com" }
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
               className="p-3 glass rounded-full hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300">
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={scrollToNext}
          className="floating absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
};
