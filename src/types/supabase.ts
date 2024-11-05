export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          id: string
          user_id: string
          created_at: string
          // ... további mezők az ads táblából
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
        }
      }
      // ... további táblák
    }
  }
} 