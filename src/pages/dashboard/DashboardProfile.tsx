import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Save, User } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

const DashboardProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    display_name: "",
    email: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id)
      .maybeSingle();

    if (error) {
      toast.error("Failed to fetch profile");
    } else if (data) {
      setProfile(data);
      setFormData({
        display_name: data.display_name || "",
        email: data.email || "",
        avatar_url: data.avatar_url || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    if (profile) {
      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", profile.id);

      if (error) {
        toast.error("Failed to update profile");
      } else {
        toast.success("Profile updated");
        fetchProfile();
      }
    } else {
      const { error } = await supabase.from("profiles").insert({
        ...formData,
        user_id: user.id,
      });

      if (error) {
        toast.error("Failed to create profile");
      } else {
        toast.success("Profile created");
        fetchProfile();
      }
    }
    setSaving(false);
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
        <h1 className="text-3xl font-bold text-gradient">Profile</h1>
      </div>

      <Card className="glass border-card-border max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-card-glass border border-card-border flex items-center justify-center overflow-hidden">
              {formData.avatar_url ? (
                <img
                  src={formData.avatar_url}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">{formData.display_name || "No name set"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                placeholder="Your display name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email (displayed on portfolio)</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Avatar URL</Label>
              <Input
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="glass border-card-border max-w-2xl">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-card-border">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-mono text-sm">{user?.id}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-card-border">
            <span className="text-muted-foreground">Auth Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Account Created</span>
            <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardProfile;
