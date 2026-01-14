import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Calendar } from "lucide-react";

const awards = [
  {
    title: "IndonesiaNEXT Season 8 Best 1000 Talent",
    organization: "Telkomsel IndonesiaNEXT",
    date: "2024",
    category: "Talent Recognition",
    description: "Selected as one of the top 1,000 talents nationwide in IndonesiaNEXT Season 8.",
    achievement: "Best 1000 Talent",
    icon: Trophy
  },
  {
    title: "IndonesiaNEXT Season 7 Best 2000 Talent",
    organization: "Telkomsel IndonesiaNEXT",
    date: "2023",
    category: "Talent Recognition",
    description: "Selected as one of the top 2,000 talents nationwide in IndonesiaNEXT Season 7.",
    achievement: "Best 2000 Talent",
    icon: Star
  },
  {
    title: "ITENAS Dissemination Seminar Publication",
    organization: "Institut Teknologi Nasional Bandung",
    date: "2024",
    category: "Research Publication",
    description: "Published a comparative study on the performance of YOLOv9–YOLOv11 at the ITENAS Dissemination Seminar.",
    achievement: "Research Publication",
    icon: Trophy
  }
];

export const Awards = () => {
  useScrollAnimation();

  return (
    <section id="awards" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Awards & Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognition and achievements throughout my professional journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <Card 
                key={index}
                className="glass card-3d glow-on-hover p-8 animate-on-scroll relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <IconComponent className="w-full h-full text-primary" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-tertiary/10 text-tertiary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold text-foreground">
                          {award.title}
                        </h3>
                        <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full whitespace-nowrap">
                          {award.achievement}
                        </span>
                      </div>
                      <p className="text-secondary font-semibold mb-2">
                        {award.organization}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{award.date}</span>
                        </div>
                        <span className="text-primary font-medium">
                          {award.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {award.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
