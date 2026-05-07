export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      account_notifications: {
        Row: {
          artist_address: string;
          last_nudge_sent_at: string | null;
          notify_enabled: boolean;
          nudge_period: number | null;
          telegram_chat_id: string | null;
        };
        Insert: {
          artist_address: string;
          last_nudge_sent_at?: string | null;
          notify_enabled?: boolean;
          nudge_period?: number | null;
          telegram_chat_id?: string | null;
        };
        Update: {
          artist_address?: string;
          last_nudge_sent_at?: string | null;
          notify_enabled?: boolean;
          nudge_period?: number | null;
          telegram_chat_id?: string | null;
        };
        Relationships: [];
      };
      in_process_admins: {
        Row: {
          artist_address: string;
          collection: string;
          granted_at: string;
          hidden: boolean;
          id: string;
          token_id: number;
        };
        Insert: {
          artist_address: string;
          collection: string;
          granted_at: string;
          hidden?: boolean;
          id?: string;
          token_id: number;
        };
        Update: {
          artist_address?: string;
          collection?: string;
          granted_at?: string;
          hidden?: boolean;
          id?: string;
          token_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_admins_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_admins_collection_fkey";
            columns: ["collection"];
            isOneToOne: false;
            referencedRelation: "in_process_collections";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_api_keys: {
        Row: {
          artist_address: string | null;
          created_at: string;
          id: string;
          key_hash: string | null;
          last_used: string | null;
          name: string;
        };
        Insert: {
          artist_address?: string | null;
          created_at?: string;
          id?: string;
          key_hash?: string | null;
          last_used?: string | null;
          name: string;
        };
        Update: {
          artist_address?: string | null;
          created_at?: string;
          id?: string;
          key_hash?: string | null;
          last_used?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_api_keys_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_artist_phones: {
        Row: {
          artist_address: string;
          created_at: string;
          id: string;
          phone_number: string;
          verified: boolean;
        };
        Insert: {
          artist_address: string;
          created_at?: string;
          id?: string;
          phone_number: string;
          verified?: boolean;
        };
        Update: {
          artist_address?: string;
          created_at?: string;
          id?: string;
          phone_number?: string;
          verified?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_artist_phones_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_artist_social_wallets: {
        Row: {
          artist_address: string;
          created_at: string;
          social_wallet: string;
        };
        Insert: {
          artist_address: string;
          created_at?: string;
          social_wallet: string;
        };
        Update: {
          artist_address?: string;
          created_at?: string;
          social_wallet?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_artist_social_wallets_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_artists: {
        Row: {
          address: string;
          bio: string | null;
          farcaster_username: string | null;
          instagram_username: string | null;
          smart_wallet: string | null;
          telegram_username: string | null;
          twitter_username: string | null;
          username: string | null;
        };
        Insert: {
          address: string;
          bio?: string | null;
          farcaster_username?: string | null;
          instagram_username?: string | null;
          smart_wallet?: string | null;
          telegram_username?: string | null;
          twitter_username?: string | null;
          username?: string | null;
        };
        Update: {
          address?: string;
          bio?: string | null;
          farcaster_username?: string | null;
          instagram_username?: string | null;
          smart_wallet?: string | null;
          telegram_username?: string | null;
          twitter_username?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      in_process_arweave_uploads: {
        Row: {
          artist_address: string;
          arweave_uri: string;
          content_type: string;
          created_at: string;
          file_size_bytes: number;
          id: string;
          usdc_cost: number | null;
          winc_cost: string;
        };
        Insert: {
          artist_address: string;
          arweave_uri: string;
          content_type: string;
          created_at?: string;
          file_size_bytes: number;
          id?: string;
          usdc_cost?: number | null;
          winc_cost: string;
        };
        Update: {
          artist_address?: string;
          arweave_uri?: string;
          content_type?: string;
          created_at?: string;
          file_size_bytes?: number;
          id?: string;
          usdc_cost?: number | null;
          winc_cost?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_arweave_uploads_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_collections: {
        Row: {
          address: string;
          chain_id: number;
          created_at: string;
          creator: string;
          id: string;
          name: string;
          protocol: Database["public"]["Enums"]["collection_protocol"];
          updated_at: string;
          uri: string;
        };
        Insert: {
          address: string;
          chain_id: number;
          created_at: string;
          creator: string;
          id?: string;
          name?: string;
          protocol?: Database["public"]["Enums"]["collection_protocol"];
          updated_at: string;
          uri: string;
        };
        Update: {
          address?: string;
          chain_id?: number;
          created_at?: string;
          creator?: string;
          id?: string;
          name?: string;
          protocol?: Database["public"]["Enums"]["collection_protocol"];
          updated_at?: string;
          uri?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_collections_creator_fkey";
            columns: ["creator"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
      in_process_metadata: {
        Row: {
          animation_url: string | null;
          content: Json | null;
          created_at: string;
          description: string | null;
          external_url: string | null;
          id: string;
          image: string | null;
          moment: string;
          name: string | null;
        };
        Insert: {
          animation_url?: string | null;
          content?: Json | null;
          created_at?: string;
          description?: string | null;
          external_url?: string | null;
          id?: string;
          image?: string | null;
          moment: string;
          name?: string | null;
        };
        Update: {
          animation_url?: string | null;
          content?: Json | null;
          created_at?: string;
          description?: string | null;
          external_url?: string | null;
          id?: string;
          image?: string | null;
          moment?: string;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_metadata_moment_fkey";
            columns: ["moment"];
            isOneToOne: true;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_moment_comments: {
        Row: {
          artist_address: string;
          comment: string | null;
          commented_at: string;
          id: string;
          moment: string;
        };
        Insert: {
          artist_address: string;
          comment?: string | null;
          commented_at?: string;
          id?: string;
          moment: string;
        };
        Update: {
          artist_address?: string;
          comment?: string | null;
          commented_at?: string;
          id?: string;
          moment?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_moment_comments_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_moment_comments_moment_fkey";
            columns: ["moment"];
            isOneToOne: false;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_moment_fee_recipients: {
        Row: {
          artist_address: string;
          created_at: string;
          id: string;
          moment: string;
          percent_allocation: number;
        };
        Insert: {
          artist_address: string;
          created_at?: string;
          id?: string;
          moment: string;
          percent_allocation: number;
        };
        Update: {
          artist_address?: string;
          created_at?: string;
          id?: string;
          moment?: string;
          percent_allocation?: number;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_moment_fee_recipients_artist_address_fkey";
            columns: ["artist_address"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_moment_fee_recipients_moment_fkey";
            columns: ["moment"];
            isOneToOne: false;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_moments: {
        Row: {
          channel: string | null;
          collection: string;
          created_at: string;
          id: string;
          max_supply: number;
          token_id: number;
          updated_at: string;
          uri: string;
        };
        Insert: {
          channel?: string | null;
          collection: string;
          created_at: string;
          id?: string;
          max_supply: number;
          token_id: number;
          updated_at: string;
          uri: string;
        };
        Update: {
          channel?: string | null;
          collection?: string;
          created_at?: string;
          id?: string;
          max_supply?: number;
          token_id?: number;
          updated_at?: string;
          uri?: string;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_moments_collection_fkey";
            columns: ["collection"];
            isOneToOne: false;
            referencedRelation: "in_process_collections";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_notifications: {
        Row: {
          artist: string;
          created_at: string | null;
          id: string;
          transfer: string;
          viewed: boolean;
        };
        Insert: {
          artist: string;
          created_at?: string | null;
          id?: string;
          transfer: string;
          viewed?: boolean;
        };
        Update: {
          artist?: string;
          created_at?: string | null;
          id?: string;
          transfer?: string;
          viewed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_notifications_artist_fkey";
            columns: ["artist"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
          {
            foreignKeyName: "in_process_notifications_transfer_fkey";
            columns: ["transfer"];
            isOneToOne: false;
            referencedRelation: "in_process_transfers";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_sales: {
        Row: {
          created_at: string;
          currency: string;
          funds_recipient: string;
          id: string;
          max_tokens_per_address: number;
          moment: string;
          price_per_token: number;
          sale_end: number;
          sale_start: number;
        };
        Insert: {
          created_at?: string;
          currency: string;
          funds_recipient: string;
          id?: string;
          max_tokens_per_address: number;
          moment: string;
          price_per_token: number;
          sale_end: number;
          sale_start: number;
        };
        Update: {
          created_at?: string;
          currency?: string;
          funds_recipient?: string;
          id?: string;
          max_tokens_per_address?: number;
          moment?: string;
          price_per_token?: number;
          sale_end?: number;
          sale_start?: number;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_sales_moment_fkey";
            columns: ["moment"];
            isOneToOne: true;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
        ];
      };
      in_process_transfers: {
        Row: {
          currency: string | null;
          id: string;
          moment: string;
          quantity: number;
          recipient: string;
          transaction_hash: string;
          transferred_at: string;
          value: number | null;
        };
        Insert: {
          currency?: string | null;
          id?: string;
          moment: string;
          quantity: number;
          recipient: string;
          transaction_hash: string;
          transferred_at: string;
          value?: number | null;
        };
        Update: {
          currency?: string | null;
          id?: string;
          moment?: string;
          quantity?: number;
          recipient?: string;
          transaction_hash?: string;
          transferred_at?: string;
          value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "in_process_transfers_moment_fkey";
            columns: ["moment"];
            isOneToOne: false;
            referencedRelation: "in_process_moments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "in_process_transfers_recipient_fkey";
            columns: ["recipient"];
            isOneToOne: false;
            referencedRelation: "in_process_artists";
            referencedColumns: ["address"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      build_moment_json: {
        Args: {
          p_address: string;
          p_chain_id: number;
          p_collection: string;
          p_created_at: string;
          p_creator: string;
          p_creator_hidden: boolean;
          p_creator_username: string;
          p_id: string;
          p_metadata: Json;
          p_protocol: string;
          p_token_id: number;
          p_uri: string;
        };
        Returns: Json;
      };
      build_timeline_result: {
        Args: {
          p_capped_limit: number;
          p_clamped_page: number;
          p_moments: Json;
          p_total_count: number;
        };
        Returns: Json;
      };
      get_airdrop_transfers: {
        Args: {
          p_artist?: string;
          p_chain_id?: number;
          p_collector?: string;
          p_content_type?: string;
          p_limit?: number;
          p_offset?: number;
        };
        Returns: {
          total_count: number;
          transfers: Json;
        }[];
      };
      get_artist_timeline: {
        Args: {
          p_artist: string;
          p_chainid?: number;
          p_channel?: string;
          p_curated?: boolean;
          p_hidden?: boolean;
          p_limit?: number;
          p_mime?: string;
          p_page?: number;
          p_period?: string;
          p_type?: string;
        };
        Returns: Json;
      };
      get_collection_timeline: {
        Args: {
          p_artist?: string;
          p_chainid?: number;
          p_channel?: string;
          p_collection: string;
          p_curated?: boolean;
          p_hidden?: boolean;
          p_limit?: number;
          p_mime?: string;
          p_page?: number;
          p_period?: string;
        };
        Returns: Json;
      };
      get_creator_hidden: {
        Args: {
          p_artist_address: string;
          p_collection: string;
          p_token_id: number;
        };
        Returns: boolean;
      };
      get_in_process_timeline: {
        Args: {
          p_chainid?: number;
          p_channel?: string;
          p_curated?: boolean;
          p_hidden?: boolean;
          p_limit?: number;
          p_mime?: string;
          p_page?: number;
          p_period?: string;
        };
        Returns: Json;
      };
      get_in_process_tokens: {
        Args: {
          p_addresses?: string[];
          p_artist?: string;
          p_chainid?: number;
          p_hidden?: boolean;
          p_latest?: boolean;
          p_limit?: number;
          p_page?: number;
          p_tokenids?: number[];
          p_type?: string;
        };
        Returns: Json;
      };
      get_moment_admins_json: {
        Args: { p_collection: string; p_token_id: number };
        Returns: Json;
      };
      get_nudges: {
        Args: never;
        Returns: {
          artist_address: string;
          chat_id: string;
          days_since_last_moment: number;
          nudge_period: number;
        }[];
      };
      get_weekly_wrap_up_stats: {
        Args: { p_days?: number };
        Returns: {
          api_count: number;
          chat_id: string;
          sms_count: number;
          telegram_count: number;
          username: string;
          web_count: number;
        }[];
      };
      moment_is_visible: {
        Args: { p_collection: string; p_hidden: boolean; p_token_id: number };
        Returns: boolean;
      };
      moment_matches_channel: {
        Args: { p_channel: string; p_moment_id: string };
        Returns: boolean;
      };
      moment_matches_period: {
        Args: { p_created_at: string; p_period: string };
        Returns: boolean;
      };
      show_limit: { Args: never; Returns: number };
      show_trgm: { Args: { "": string }; Returns: string[] };
      upsert_artist_names: { Args: { artists: Json }; Returns: undefined };
    };
    Enums: {
      collection_protocol: "in_process" | "catalog" | "sound.xyz" | "zora_media";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      collection_protocol: ["in_process", "catalog", "sound.xyz", "zora_media"],
    },
  },
} as const;
