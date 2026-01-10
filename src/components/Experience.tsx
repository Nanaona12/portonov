import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Magang Fullstack Website Developer",
    company: "PT JARI Information Technology",
    location: "Bandung, Indonesia",
    period: "Aug 2023 - Dec 2023",
    description:
      "Mengembangkan dan memelihara aplikasi web berbasis Laravel. Meningkatkan performa front-end menggunakan Bootstrap dan Vue.js, serta mengoptimalkan REST API, database indexing, dan caching hingga meningkatkan load time sebesar 30%. Berkolaborasi erat dengan tim UI/UX desain.",
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
    title: "Koordinator Pengawas Ujian Informatika",
    company: "National Institute of Technology",
    location: "Bandung, Indonesia",
    period: "Mar 2022 - Jan 2025",
    description:
      "Mengelola dan menjadwalkan lebih dari 30 sesi ujian per semester serta berkoordinasi dengan 15–20 pengawas. Berkomunikasi dengan 20+ dosen untuk memastikan kelancaran teknis ujian. Mengarsipkan laporan pengawasan dan absensi secara akurat menggunakan Google Workspace.",
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
      "Mengajar dasar-dasar pemrograman Python kepada lebih dari 100 siswa SMA dengan metode pembelajaran berbasis proyek. Berkolaborasi dalam penyusunan dan penyesuaian materi, serta membimbing siswa dalam membangun aplikasi dan memahami berbagai algoritma Python.",
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
      "Mengelola proyek pengembangan website end-to-end untuk berbagai UMKM, mulai dari analisis kebutuhan, perancangan, pengembangan hingga deployment. Berkomunikasi langsung dengan klien untuk menetapkan timeline dan fitur, serta menangani beberapa proyek secara paralel dengan manajemen waktu yang baik.",
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