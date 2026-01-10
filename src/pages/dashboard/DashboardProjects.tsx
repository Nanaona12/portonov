import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;

const DashboardProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();

  const emptyProject = {
    title: "",
    description: "",
    long_description: "",
    technologies: [] as string[],
    image_url: "",
    live_url: "",
    github_url: "",
    duration: "",
    team_size: "",
    role: "",
    features: [] as string[],
    challenges: [] as string[],
    achievements: [] as string[],
    is_featured: false,
    sort_order: 0,
  };

  const [formData, setFormData] = useState(emptyProject);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user!.id)
      .order("sort_order");

    if (error) {
      toast.error("Failed to fetch projects");
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;

    const payload = {
      ...formData,
      user_id: user.id,
    };

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update project");
      } else {
        toast.success("Project updated");
        setEditingId(null);
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from("projects").insert(payload);

      if (error) {
        toast.error("Failed to create project");
      } else {
        toast.success("Project created");
        setIsAdding(false);
        fetchProjects();
      }
    }
    setFormData(emptyProject);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setIsAdding(false);
    setFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description || "",
      technologies: project.technologies || [],
      image_url: project.image_url || "",
      live_url: project.live_url || "",
      github_url: project.github_url || "",
      duration: project.duration || "",
      team_size: project.team_size || "",
      role: project.role || "",
      features: project.features || [],
      challenges: project.challenges || [],
      achievements: project.achievements || [],
      is_featured: project.is_featured || false,
      sort_order: project.sort_order || 0,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete project");
    } else {
      toast.success("Project deleted");
      fetchProjects();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyProject);
  };

  const handleArrayChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((s) => s.trim()),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gradient">Projects</h1>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="glass border-card-border">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Your role"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Short Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
              />
            </div>

            <div className="space-y-2">
              <Label>Long Description</Label>
              <Textarea
                value={formData.long_description}
                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                placeholder="Detailed description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months"
                />
              </div>
              <div className="space-y-2">
                <Label>Team Size</Label>
                <Input
                  value={formData.team_size}
                  onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                  placeholder="e.g., 5 people"
                />
              </div>
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies (comma separated)</Label>
              <Input
                value={formData.technologies.join(", ")}
                onChange={(e) => handleArrayChange("technologies", e.target.value)}
                placeholder="React, TypeScript, Tailwind"
              />
            </div>

            <div className="space-y-2">
              <Label>Features (comma separated)</Label>
              <Textarea
                value={formData.features.join(", ")}
                onChange={(e) => handleArrayChange("features", e.target.value)}
                placeholder="Feature 1, Feature 2"
              />
            </div>

            <div className="space-y-2">
              <Label>Challenges (comma separated)</Label>
              <Textarea
                value={formData.challenges.join(", ")}
                onChange={(e) => handleArrayChange("challenges", e.target.value)}
                placeholder="Challenge 1, Challenge 2"
              />
            </div>

            <div className="space-y-2">
              <Label>Achievements (comma separated)</Label>
              <Textarea
                value={formData.achievements.join(", ")}
                onChange={(e) => handleArrayChange("achievements", e.target.value)}
                placeholder="Achievement 1, Achievement 2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <Label>Featured Project</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="glass border-card-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    {project.is_featured && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Featured</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="text-xs bg-card-glass px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card className="glass border-card-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              No projects yet. Click "Add Project" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardProjects;
