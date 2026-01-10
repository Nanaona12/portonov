import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass backdrop-blur-xl py-3' : 'py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
        <img src={logo} alt="logo" className="w-36 h-auto object-contain"/>

        <div className="hidden md:flex items-center space-x-6">
          {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Organizations', 'Certifications', 'Awards', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-[18px] font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"

            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="sm" asChild>
            <Link to="/auth">
              <Settings className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button> */}
          <Button variant="glass" size="sm" onClick={() => scrollTo('contact')}>
            Let's Talk
          </Button>
        </div>
      </div>
    </nav>
  );
};