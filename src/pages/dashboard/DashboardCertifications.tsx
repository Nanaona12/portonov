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

type Certification = Tables<"certifications">;

const DashboardCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();

  const emptyCertification = {
    name: "",
    issuer: "",
    date_issued: "",
    description: "",
    credential_id: "",
    credential_url: "",
    sort_order: 0,
  };

  const [formData, setFormData] = useState(emptyCertification);

  useEffect(() => {
    if (user) fetchCertifications();
  }, [user]);

  const fetchCertifications = async () => {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .eq("user_id", user!.id)
      .order("sort_order");

    if (error) {
      toast.error("Failed to fetch certifications");
    } else {
      setCertifications(data || []);
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
        .from("certifications")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update certification");
      } else {
        toast.success("Certification updated");
        setEditingId(null);
        fetchCertifications();
      }
    } else {
      const { error } = await supabase.from("certifications").insert(payload);

      if (error) {
        toast.error("Failed to create certification");
      } else {
        toast.success("Certification created");
        setIsAdding(false);
        fetchCertifications();
      }
    }
    setFormData(emptyCertification);
  };

  const handleEdit = (cert: Certification) => {
    setEditingId(cert.id);
    setIsAdding(false);
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date_issued: cert.date_issued || "",
      description: cert.description || "",
      credential_id: cert.credential_id || "",
      credential_url: cert.credential_url || "",
      sort_order: cert.sort_order || 0,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;

    const { error } = await supabase.from("certifications").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete certification");
    } else {
      toast.success("Certification deleted");
      fetchCertifications();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyCertification);
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
        <h1 className="text-3xl font-bold text-gradient">Certifications</h1>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Certification
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="glass border-card-border">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Certification" : "Add New Certification"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Certification name"
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
                <Label>Date Issued</Label>
                <Input
                  type="date"
                  value={formData.date_issued}
                  onChange={(e) => setFormData({ ...formData, date_issued: e.target.value })}
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
                placeholder="Certification description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Credential ID</Label>
                <Input
                  value={formData.credential_id}
                  onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                  placeholder="Credential ID"
                />
              </div>
              <div className="space-y-2">
                <Label>Credential URL</Label>
                <Input
                  value={formData.credential_url}
                  onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
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
        {certifications.map((cert) => (
          <Card key={cert.id} className="glass border-card-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{cert.name}</h3>
                  <p className="text-primary">{cert.issuer}</p>
                  {cert.date_issued && (
                    <p className="text-sm text-muted-foreground">
                      {new Date(cert.date_issued).toLocaleDateString()}
                    </p>
                  )}
                  {cert.description && <p className="text-sm mt-2">{cert.description}</p>}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(cert)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {certifications.length === 0 && (
          <Card className="glass border-card-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              No certifications yet. Click "Add Certification" to create one.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardCertifications;
