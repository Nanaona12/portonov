import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Organizations } from "@/components/Organizations";
import { Certifications } from "@/components/Certifications";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  useScrollAnimation();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Organizations />
      <Certifications />
      <Awards />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
