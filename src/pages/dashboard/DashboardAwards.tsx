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

type Award = Tables<"awards">;

const DashboardAwards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();

  const emptyAward = {
    title: "",
    issuer: "",
    year: new Date().getFullYear(),
    description: "",
    sort_order: 0,
  };

  const [formData, setFormData] = useState(emptyAward);

  useEffect(() => {
    if (user) fetchAwards();
  }, [user]);

  const fetchAwards = async () => {
    const { data, error } = await supabase
      .from("awards")
      .select("*")
      .eq("user_id", user!.id)
      .order("sort_order");

    if (error) {
      toast.error("Failed to fetch awards");
    } else {
      setAwards(data || []);
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
        .from("awards")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update award");
      } else {
        toast.success("Award updated");
        setEditingId(null);
        fetchAwards();
      }
    } else {
      const { error } = await supabase.from("awards").insert(payload);

      if (error) {
        toast.error("Failed to create award");
      } else {
        toast.success("Award created");
        setIsAdding(false);
        fetchAwards();
      }
    }
    setFormData(emptyAward);
  };

  const handleEdit = (award: Award) => {
    setEditingId(award.id);
    setIsAdding(false);
    setFormData({
      title: award.title,
      issuer: award.issuer,
      year: award.year,
      description: award.description || "",
      sort_order: award.sort_order || 0,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this award?")) return;

    const { error } = await supabase.from("awards").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete award");
    } else {
      toast.success("Award deleted");
      fetchAwards();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyAward);
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
        <h1 className="text-3xl font-bold text-gradient">Awards</h1>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Award
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="glass border-card-border">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Award" : "Add New Award"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Award title"
                />
              </div>
              <div className="space-y-2">
                <Label>Issuer *</Label>
                <Input
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="Issuing organization"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Year *</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
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
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Award description"
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
        {awards.map((award) => (
          <Card key={award.id} className="glass border-card-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{award.title}</h3>
                  <p className="text-primary">{award.issuer}</p>
                  <p className="text-sm text-muted-foreground">{award.year}</p>
                  {award.description && <p className="text-sm mt-2">{award.description}</p>}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(award)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(award.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {awards.length === 0 && (
          <Card className="glass border-card-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              No awards yet. Click "Add Award" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardAwards;
