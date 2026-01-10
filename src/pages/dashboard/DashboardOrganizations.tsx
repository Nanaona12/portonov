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

type Organization = Tables<"organizations">;

const DashboardOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();

  const emptyOrganization = {
    name: "",
    role: "",
    duration: "",
    description: "",
    achievements: [] as string[],
    sort_order: 0,
  };

  const [formData, setFormData] = useState(emptyOrganization);

  useEffect(() => {
    if (user) fetchOrganizations();
  }, [user]);

  const fetchOrganizations = async () => {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("user_id", user!.id)
      .order("sort_order");

    if (error) {
      toast.error("Failed to fetch organizations");
    } else {
      setOrganizations(data || []);
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
        .from("organizations")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update organization");
      } else {
        toast.success("Organization updated");
        setEditingId(null);
        fetchOrganizations();
      }
    } else {
      const { error } = await supabase.from("organizations").insert(payload);

      if (error) {
        toast.error("Failed to create organization");
      } else {
        toast.success("Organization created");
        setIsAdding(false);
        fetchOrganizations();
      }
    }
    setFormData(emptyOrganization);
  };

  const handleEdit = (org: Organization) => {
    setEditingId(org.id);
    setIsAdding(false);
    setFormData({
      name: org.name,
      role: org.role,
      duration: org.duration,
      description: org.description,
      achievements: org.achievements || [],
      sort_order: org.sort_order || 0,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this organization?")) return;

    const { error } = await supabase.from("organizations").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete organization");
    } else {
      toast.success("Organization deleted");
      fetchOrganizations();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyOrganization);
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
        <h1 className="text-3xl font-bold text-gradient">Organizations</h1>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Organization
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="glass border-card-border">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Organization" : "Add New Organization"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Organization name"
                />
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Your role"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration *</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., Sep 2021 - Sep 2022"
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
                placeholder="Role description"
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
        {organizations.map((org) => (
          <Card key={org.id} className="glass border-card-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{org.name}</h3>
                  <p className="text-primary">{org.role}</p>
                  <p className="text-sm text-muted-foreground">{org.duration}</p>
                  <p className="text-sm mt-2">{org.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(org)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(org.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {organizations.length === 0 && (
          <Card className="glass border-card-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              No organizations yet. Click "Add Organization" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardOrganizations;
