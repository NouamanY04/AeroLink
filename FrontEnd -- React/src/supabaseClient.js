import { createClient } from '@supabase/supabase-js';

// Replace with your own Supabase project URL and anon key
const supabaseUrl = 'https://kqxqmnkcohzipcnzfoly.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxeHFtbmtjb2h6aXBjbnpmb2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDU2NzcsImV4cCI6MjA2MzUyMTY3N30.zweoiEwNWOyS7WzDzYU-acG9vwtw5evBqMs5GdfI3d4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);