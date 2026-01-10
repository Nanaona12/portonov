import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

const organizations = [
  {
    title: "Advisor",
    organization: "I-WILL (Innovative Workingspace Integrated Living Laboratory) ITENAS",
    location: "Bandung, Indonesia",
    period: "Jul 2024 - Jan 2025",
    description: "Membimbing dan mengawasi proyek R&D di bidang Teknologi Game, Robotika, dan IoT. Berkolaborasi dengan divisi R&D untuk mengevaluasi proposal penelitian serta menyeleksi tim proyek yang berpotensi.",
    achievements: ["Membimbing proyek R&D", "Evaluasi proposal penelitian", "Mendukung perencanaan dan monitoring proyek"],
    type: "Advisory"
  },
  {
    title: "Sekretaris Umum",
    organization: "Badan Eksekutif Keluarga Mahasiswa (BE-KM) ITENAS",
    location: "Bandung, Indonesia", 
    period: "Sep 2021 - Sep 2022",
    description: "Mengelola penjadwalan dan dokumentasi lebih dari 20 rapat organisasi. Memimpin koordinasi acara mahasiswa tingkat kampus dengan rata-rata partisipasi 80%.",
    achievements: ["Meningkatkan efektivitas komunikasi", "Menyusun rencana strategis tahunan", "Optimasi alokasi sumber daya hingga 15%"],
    type: "Leadership"
  },
  {
    title: "Anggota Kementrian Keuangan",
    organization: "Badan Eksekutif Keluarga Mahasiswa (BE-KM) ITENAS",
    location: "Bandung, Indonesia",
    period: "Aug 2020 - Aug 2021",
    description: "Mengawasi pengelolaan keuangan untuk lebih dari 10 program organisasi, memastikan pelaporan transparan dan sesuai regulasi. Menyederhanakan proses pengadaan dan penyusunan anggaran.",
    achievements: ["Efisiensi biaya sebesar 10%", "Pelaporan keuangan transparan", "Memperoleh pendanaan eksternal"],
    type: "Finance"
  },
  {
    title: "Anggota",
    organization: "Himpunan Mahasiswa Informatika (HMIF) ITENAS",
    location: "Bandung, Indonesia",
    period: "Sep 2019 - Aug 2023",
    description: "Berpartisipasi dalam berbagai program kerja HMIF. Terlibat dalam divisi Keuangan, Acara, dan Humas selama pelaksanaan kegiatan.",
    achievements: ["Penyusunan proposal", "Koordinasi acara", "Pengelolaan administrasi"],
    type: "Member"
  }
];

export const Organizations = () => {
  useScrollAnimation();

  return (
    <section id="organizations" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Pengalaman Organisasi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Peran kepemimpinan dan keterlibatan komunitas yang membentuk kemampuan kolaboratif saya
          </p>
        </div>

        <div className="space-y-8">
          {organizations.map((org, index) => (
            <Card 
              key={index}
              className="glass card-3d glow-on-hover p-8 animate-on-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-tertiary/10 text-tertiary">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {org.title}
                      </h3>
                      <h4 className="text-xl text-primary mb-2 font-semibold">
                        {org.organization}
                      </h4>
                      <div className="flex flex-wrap gap-4 mb-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{org.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{org.location}</span>
                        </div>
                        <Badge 
                          variant="secondary"
                          className="bg-secondary/10 text-secondary border-secondary/20"
                        >
                          {org.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {org.description}
                  </p>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground mb-3">Pencapaian Utama:</h5>
                    <ul className="space-y-2">
                      {org.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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
