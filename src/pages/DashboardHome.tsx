import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FolderOpen, 
  Briefcase, 
  Award, 
  Trophy, 
  Users, 
  Eye,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Stats {
  projects: number;
  experience: number;
  certifications: number;
  awards: number;
  organizations: number;
}

const DashboardHome = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    experience: 0,
    certifications: 0,
    awards: 0,
    organizations: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useScrollAnimation();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;

    try {
      const [
        { count: projectsCount },
        { count: experienceCount },
        { count: certificationsCount },
        { count: awardsCount },
        { count: organizationsCount }
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('experience').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('certifications').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('awards').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('organizations').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
      ]);

      setStats({
        projects: projectsCount || 0,
        experience: experienceCount || 0,
        certifications: certificationsCount || 0,
        awards: awardsCount || 0,
        organizations: organizationsCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Projects",
      count: stats.projects,
      icon: FolderOpen,
      color: "text-primary",
      href: "/dashboard/projects"
    },
    {
      title: "Experience",
      count: stats.experience,
      icon: Briefcase,
      color: "text-secondary",
      href: "/dashboard/experience"
    },
    {
      title: "Certifications",
      count: stats.certifications,
      icon: Award,
      color: "text-tertiary",
      href: "/dashboard/certifications"
    },
    {
      title: "Awards",
      count: stats.awards,
      icon: Trophy,
      color: "text-yellow-500",
      href: "/dashboard/awards"
    },
    {
      title: "Organizations",
      count: stats.organizations,
      icon: Users,
      color: "text-green-500",
      href: "/dashboard/organizations"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-on-scroll">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Welcome Back!</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your portfolio content from this dashboard
            </p>
          </div>
          <Button asChild variant="hero">
            <Link to="/" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              View Portfolio
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <Card key={card.title} className="glass border-card-border hover:bg-card-glass/80 transition-all duration-300 animate-on-scroll">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.count}</div>
              <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
                <Link to={card.href}>
                  <Plus className="w-3 h-3 mr-1" />
                  Manage
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass border-card-border animate-on-scroll">
        <CardHeader>
          <CardTitle className="text-xl">
            <span className="text-gradient">Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-20 flex flex-col">
              <Link to="/dashboard/projects">
                <FolderOpen className="w-6 h-6 mb-2" />
                <span>Add New Project</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col">
              <Link to="/dashboard/experience">
                <Briefcase className="w-6 h-6 mb-2" />
                <span>Add Experience</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col">
              <Link to="/dashboard/certifications">
                <Award className="w-6 h-6 mb-2" />
                <span>Add Certification</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="glass border-card-border animate-on-scroll">
        <CardHeader>
          <CardTitle className="text-xl">
            <span className="text-gradient">💡 Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-muted-foreground">
              Use the <strong>sort_order</strong> field to organize how items appear on your portfolio
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
            <p className="text-muted-foreground">
              Mark projects as <strong>featured</strong> to highlight them on your portfolio
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-tertiary rounded-full mt-2"></div>
            <p className="text-muted-foreground">
              Click "View Portfolio" to see how your changes look to visitors
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;