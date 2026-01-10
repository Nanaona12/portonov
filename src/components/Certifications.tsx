import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";

const certifications = [
  {
    title: "Google Project Management Professional Certificate",
    issuer: "Google X Komdigi",
    date: "2025",
    description: "Sertifikasi profesional dalam manajemen proyek yang mencakup metodologi Agile, Scrum, dan praktik terbaik dalam mengelola proyek.",
    skills: ["Project Management", "Agile", "Scrum", "Risk Management", "Stakeholder Communication"]
  },
  {
    title: "Linear Models in Machine Learning: Fundamentals, Applications, and Competition",
    issuer: "Yandex X Komdigi",
    date: "2025",
    description: "Sertifikasi dalam Machine Learning dengan fokus pada model linear, aplikasi praktis, dan implementasi dalam kompetisi.",
    skills: ["Machine Learning", "Linear Models", "Data Science", "Python", "Competition"]
  },
  {
    title: "Microsoft Office Specialist: Excel Associate (Office 2019)",
    issuer: "Microsoft",
    date: "2024",
    description: "Sertifikasi resmi Microsoft yang menunjukkan kemahiran dalam Microsoft Excel termasuk analisis data, pivot tables, rumus lanjutan, dan teknik visualisasi.",
    skills: ["Excel Advanced", "Data Analysis", "Pivot Tables", "VLOOKUP", "Data Visualization"]
  }
];

export const Certifications = () => {
  useScrollAnimation();

  return (
    <section id="certifications" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Sertifikasi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sertifikasi profesional dan pencapaian pembelajaran berkelanjutan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card 
              key={index}
              className="glass card-3d glow-on-hover p-8 animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-primary font-semibold mb-2">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                {cert.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    variant="secondary"
                    className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
