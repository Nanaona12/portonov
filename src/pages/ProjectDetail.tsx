import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Code, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ProjectDetail = () => {
  const { id } = useParams();
  useScrollAnimation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

const projectImages = {
  ecommerce: Object.values(
    import.meta.glob('/src/assets/projectimage/pm/*.png', {
      eager: true,
      import: 'default',
    })
  ) as string[],

  sipoin: Object.values(
    import.meta.glob('/src/assets/projectimage/sipoin/*.png', {
      eager: true,
      import: 'default',
    })
  ) as string[],

  ieltshub: Object.values(
    import.meta.glob('/src/assets/projectimage/ieltshub/*.png', {
      eager: true,
      import: 'default',
    })
  ) as string[],
};

  const projectsData = [
    {
      id: "1",
      title: "Project Management Platform",
      description: "Platform manajemen proyek berbasis web untuk pemantauan proyek secara real-time dan kolaborasi tim.",
      longDescription:
        "Platform manajemen proyek komprehensif yang dirancang untuk mendukung pemantauan proyek secara real-time, pengelolaan tugas, dan kolaborasi tim yang efisien. Aplikasi web ini menyediakan dashboard interaktif, alur kerja tugas, analitik progres proyek, serta sistem akses berbasis peran untuk membantu tim mengelola proyek yang kompleks. Platform ini dibangun dengan fokus pada kemudahan penggunaan, skalabilitas, dan performa, sehingga cocok digunakan oleh berbagai jenis industri.",

      image: projectImages.ecommerce[0],
      images: projectImages.ecommerce,

      technologies: [
        "Pemantauan proyek dan tugas secara real-time",
        "Kolaborasi tim dan log aktivitas",
        "Dashboard proyek interaktif",
        "Penugasan tugas dan pemantauan progres",
        "Sistem akses berbasis peran (Role-based Access Control)",
        "Desain responsif untuk berbagai perangkat"
      ],

      liveUrl: "#",
      githubUrl: "#",

      duration: "1 months",
      team: "1 developers",
      role: "Full-stack Developer ",

      challenges: [
        "Mengimplementasikan pembaruan proyek secara real-time menggunakan WebSocket",
        "Merancang dashboard yang intuitif untuk menampilkan data proyek yang kompleks",
        "Mengoptimalkan performa aplikasi untuk menangani data proyek dan tugas dalam jumlah besar",
        "Menerapkan sistem hak akses dan peran pengguna secara aman"
      ],

      features: [
        "Pemantauan proyek dan tugas secara real-time",
        "Kolaborasi tim dan log aktivitas",
        "Dashboard proyek interaktif",
        "Penugasan tugas dan pemantauan progres",
        "Sistem akses berbasis peran (Role-based Access Control)",
        "Desain responsif untuk berbagai perangkat"
      ],

      achievements: [
        "Meningkatkan transparansi dan visibilitas proyek bagi seluruh anggota tim",
        "Mengurangi keterlambatan proyek melalui pemantauan real-time",
        "Meningkatkan produktivitas dan efektivitas kolaborasi tim",
        "Berhasil mendukung pengelolaan banyak proyek secara bersamaan"
      ]
    },
    {
      id: "2",
      title: "SIPOIN (Sistem Pelanggaran Siswa)",
      description:
        "Sistem manajemen pelanggaran siswa berbasis web untuk pencatatan, monitoring, dan pelaporan secara terpusat.",
      longDescription:
        "SIPOIN adalah aplikasi berbasis web yang digunakan untuk mencatat dan memantau pelanggaran siswa secara terstruktur. Sistem ini membantu pihak sekolah dalam pengelolaan data pelanggaran, poin siswa, serta pembuatan laporan secara efisien. Aplikasi dikembangkan dengan fokus pada kemudahan penggunaan, performa, dan akurasi data.",
      image: projectImages.sipoin[0],
      images: projectImages.sipoin,
      technologies: [
        "Laravel",
        "Vue.js",
        "Bootstrap",
        "MySQL",
        "REST API",
        "Git"
      ],
      liveUrl: "#",
      githubUrl: "#",
      duration: "2 weeks",
      team: "1 developers",
      role: "Fullstack Web Developer",
      challenges: [
        "Merancang alur pencatatan pelanggaran yang mudah digunakan",
        "Optimasi performa query dan database",
        "Sinkronisasi data antar role pengguna"
      ],
      features: [
        "Manajemen data siswa dan pelanggaran",
        "Sistem poin pelanggaran otomatis",
        "Role-based access (Admin, Guru, Wali)",
        "Laporan dan rekap data pelanggaran",
        "Dashboard monitoring pelanggaran"
      ],
      achievements: [
        "Mempercepat proses rekap pelanggaran siswa",
        "Mengurangi kesalahan pencatatan manual",
        "Meningkatkan efisiensi administrasi sekolah"
      ]
    }
,
    {
      id: "3",
      title: "IELTS Hub",
      description:
        "Platform pembelajaran dan latihan IELTS berbasis web dengan sistem materi, latihan soal, dan evaluasi.",
      longDescription:
        "IELTS Hub adalah platform edukasi berbasis web yang dirancang untuk membantu siswa mempersiapkan tes IELTS. Aplikasi ini menyediakan materi pembelajaran, latihan soal, serta sistem evaluasi untuk mengukur perkembangan kemampuan pengguna. Fokus utama pengembangan adalah pengalaman belajar yang interaktif dan terstruktur.",
      image: projectImages.ieltshub[0],
      images: projectImages.ieltshub,
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "REST API",
        "MySQL"
      ],
      liveUrl: "#",
      githubUrl: "#",
      duration: "4 months",
      team: "1 developers",
      role: "Fullstack Developer",
      challenges: [
        "Menyusun struktur materi yang mudah dipahami",
        "Membuat UI yang nyaman untuk belajar jangka panjang",
        "Optimasi performa halaman dan state management"
      ],
      features: [
        "Manajemen materi IELTS",
        "Latihan soal berbasis kategori",
        "Progress tracking pengguna",
        "UI responsif dan modern",
        "Pengelolaan data pengguna"
      ],
      achievements: [
        "Meningkatkan engagement pengguna",
        "Mendukung proses belajar mandiri",
        "UI konsisten dan mudah digunakan"
      ]
    }

  ];

  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-on-scroll">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild variant="hero">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button asChild variant="ghost" className="group">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="hero-bg absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Project Info */}
            <div className="animate-on-scroll">
              <h1 className="text-6xl font-bold mb-6">
                <span className="text-gradient">{project.title}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {project.longDescription}
              </p>
              
              <div className="flex gap-4 mb-8">
                <Button variant="hero" size="lg" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    Source Code
                  </a>
                </Button>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-4 rounded-xl text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{project.duration}</p>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="font-semibold">{project.team}</p>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                  <Code className="w-6 h-6 mx-auto mb-2 text-tertiary" />
                  <p className="text-sm text-muted-foreground">My Role</p>
                  <p className="font-semibold text-sm">{project.role}</p>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="animate-on-scroll">
              <div className="perspective-container">
                <div className="card-3d group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-floating"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            <span className="text-gradient">Technologies Used</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-6 py-3 glass rounded-full font-medium hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Challenges Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Key Features */}
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-bold mb-8">
                <span className="text-gradient">Key Features</span>
              </h3>
              <div className="space-y-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="glass p-4 rounded-xl hover:bg-card-glass/80 transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="animate-on-scroll">
              <h3 className="text-3xl font-bold mb-8">
                <span className="text-gradient">Technical Challenges</span>
              </h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="glass p-4 rounded-xl hover:bg-card-glass/80 transition-all duration-300">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-4 mt-2" />
                      <span className="font-medium">{challenge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            <span className="text-gradient">Project Achievements</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.achievements.map((achievement, i) => (
              <div key={i} className="text-center animate-on-scroll">
                <div className="glass p-8 rounded-2xl hover:bg-card-glass/80 transition-all duration-300 group">
                  <Award className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-semibold text-lg">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            <span className="text-gradient">Project Gallery</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.images.map((image, i) => (
              <div key={i} className="animate-on-scroll">
                <div className="perspective-container">
                  <div className="card-3d group">
                    <img 
                      src={image} 
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-64 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      onClick={() => {
                        setIndex(i);
                        setOpen(true);
                      }}
                    />

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={project.images.map((img) => ({ src: img }))}
      />

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center animate-on-scroll">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-gradient">Interested in This Project?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can work together on similar projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Live Project
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/#contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;