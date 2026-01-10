export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          clients_satisfied: number | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          projects_completed: number | null
          title: string
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          clients_satisfied?: number | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          projects_completed?: number | null
          title?: string
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          clients_satisfied?: number | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          projects_completed?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      awards: {
        Row: {
          created_at: string
          description: string | null
          id: string
          issuer: string
          sort_order: number | null
          title: string
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          issuer: string
          sort_order?: number | null
          title: string
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          issuer?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          credential_id: string | null
          credential_url: string | null
          date_issued: string | null
          description: string | null
          id: string
          issuer: string
          name: string
          sort_order: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          date_issued?: string | null
          description?: string | null
          id?: string
          issuer: string
          name: string
          sort_order?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          date_issued?: string | null
          description?: string | null
          id?: string
          issuer?: string
          name?: string
          sort_order?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          achievements: string[] | null
          company: string
          created_at: string
          description: string
          duration: string
          id: string
          position: string
          sort_order: number | null
          technologies: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: string[] | null
          company: string
          created_at?: string
          description: string
          duration: string
          id?: string
          position: string
          sort_order?: number | null
          technologies?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: string[] | null
          company?: string
          created_at?: string
          description?: string
          duration?: string
          id?: string
          position?: string
          sort_order?: number | null
          technologies?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image_url: string | null
          created_at: string
          cta_text: string
          description: string
          id: string
          subtitle: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string
          cta_text?: string
          description?: string
          id?: string
          subtitle?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          background_image_url?: string | null
          created_at?: string
          cta_text?: string
          description?: string
          id?: string
          subtitle?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          achievements: string[] | null
          created_at: string
          description: string
          duration: string
          id: string
          name: string
          role: string
          sort_order: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: string[] | null
          created_at?: string
          description: string
          duration: string
          id?: string
          name: string
          role: string
          sort_order?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: string[] | null
          created_at?: string
          description?: string
          duration?: string
          id?: string
          name?: string
          role?: string
          sort_order?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          achievements: string[] | null
          challenges: string[] | null
          created_at: string
          description: string
          duration: string | null
          features: string[] | null
          github_url: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          live_url: string | null
          long_description: string | null
          role: string | null
          sort_order: number | null
          team_size: string | null
          technologies: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: string[] | null
          challenges?: string[] | null
          created_at?: string
          description: string
          duration?: string | null
          features?: string[] | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          live_url?: string | null
          long_description?: string | null
          role?: string | null
          sort_order?: number | null
          team_size?: string | null
          technologies?: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: string[] | null
          challenges?: string[] | null
          created_at?: string
          description?: string
          duration?: string | null
          features?: string[] | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          live_url?: string | null
          long_description?: string | null
          role?: string | null
          sort_order?: number | null
          team_size?: string | null
          technologies?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          icon_name: string | null
          id: string
          name: string
          proficiency: number
          sort_order: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          icon_name?: string | null
          id?: string
          name: string
          proficiency?: number
          sort_order?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          icon_name?: string | null
          id?: string
          name?: string
          proficiency?: number
          sort_order?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
