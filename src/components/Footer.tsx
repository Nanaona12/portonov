import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="text-3xl font-bold text-gradient">
            Portfolio 3D
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Github, href: "#", label: "GitHub" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Mail, href: "#", label: "Email" }
            ].map(({ Icon, href, label }) => (
              <a 
                key={label}
                href={href} 
                aria-label={label}
                className="p-3 glass rounded-full hover:scale-110 hover:bg-primary/20 hover:text-primary transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-card-border">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              © {currentYear} Made with <Heart className="w-4 h-4 text-red-500" /> by NOVIONA MARATHUS SHOLIHAH
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-10 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full floating opacity-30" />
          <div className="absolute -bottom-5 right-20 w-16 h-16 bg-gradient-to-r from-tertiary/20 to-primary/20 rounded-lg rotate-45 floating-delayed opacity-25" />
        </div>
      </div>
    </footer>
  );
};