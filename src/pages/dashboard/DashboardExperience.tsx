import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Experience = Tables<"experience">;

const DashboardExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();

  const emptyExperience = {
    position: "",
    company: "",
    duration: "",
    description: "",
    achievements: [] as string[],
    technologies: [] as string[],
    sort_order: 0,
  };

  const [formData, setFormData] = useState(emptyExperience);

  useEffect(() => {
    if (user) fetchExperiences();
  }, [user]);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .eq("user_id", user!.id)
      .order("sort_order");

    if (error) {
      toast.error("Failed to fetch experiences");
    } else {
      setExperiences(data || []);
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
        .from("experience")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update experience");
      } else {
        toast.success("Experience updated");
        setEditingId(null);
        fetchExperiences();
      }
    } else {
      const { error } = await supabase.from("experience").insert(payload);

      if (error) {
        toast.error("Failed to create experience");
      } else {
        toast.success("Experience created");
        setIsAdding(false);
        fetchExperiences();
      }
    }
    setFormData(emptyExperience);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setIsAdding(false);
    setFormData({
      position: exp.position,
      company: exp.company,
      duration: exp.duration,
      description: exp.description,
      achievements: exp.achievements || [],
      technologies: exp.technologies || [],
      sort_order: exp.sort_order || 0,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    const { error } = await supabase.from("experience").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete experience");
    } else {
      toast.success("Experience deleted");
      fetchExperiences();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyExperience);
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
        <h1 className="text-3xl font-bold text-gradient">Experience</h1>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Experience
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="glass border-card-border">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Experience" : "Add New Experience"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration *</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., Jan 2023 - Present"
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

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Job description"
                rows={3}
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

            <div className="space-y-2">
              <Label>Technologies (comma separated)</Label>
              <Input
                value={formData.technologies.join(", ")}
                onChange={(e) => handleArrayChange("technologies", e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
              />
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
        {experiences.map((exp) => (
          <Card key={exp.id} className="glass border-card-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                  <p className="text-primary">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                  <p className="text-sm mt-2">{exp.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {experiences.length === 0 && (
          <Card className="glass border-card-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              No experiences yet. Click "Add Experience" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardExperience;
