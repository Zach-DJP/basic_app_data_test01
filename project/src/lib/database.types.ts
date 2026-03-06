export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ingredients: {
        Row: {
          id: string
          name: string
          purchase_date: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          purchase_date: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          purchase_date?: string
          created_at?: string
        }
      }
    }
  }
}
