import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "nmarathuss@gmail.com",
      href: "mailto:nmarathuss@gmail.com"
    },
    {
      icon: Phone,
      label: "Telepon",
      value: "081355045905",
      href: "tel:+6281355045905"
    },
    {
      icon: MapPin,
      label: "Lokasi",
      value: "Bandung, Jawa Barat",
      href: "#"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Noviona Marathus Sholihah",
      href: "https://www.linkedin.com/in/noviona-marathus-sholihah-19a46b197/"
    }
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient">Hubungi Saya</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Siap untuk mewujudkan ide Anda? Mari diskusikan proyek Anda berikutnya
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nama</label>
                  <Input
                    id="name"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="glass border-card-border focus:border-primary/50 transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@contoh.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="glass border-card-border focus:border-primary/50 transition-colors duration-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subjek</label>
                <Input
                  id="subject"
                  placeholder="Diskusi Proyek"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="glass border-card-border focus:border-primary/50 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Pesan</label>
                <Textarea
                  id="message"
                  placeholder="Ceritakan tentang proyek Anda..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="glass border-card-border focus:border-primary/50 transition-colors duration-300 resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Kirim Pesan
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="animate-on-scroll">
            <div className="glass p-8 rounded-2xl space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Lets Connect !</h3>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <a 
                    key={i}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-card-glass/40 transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium group-hover:text-primary transition-colors duration-300">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
