import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bajvesjeegpvuxzvumtz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhanZlc2plZWdwdnV4enZ1bXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NTk0MjcsImV4cCI6MjA5NzQzNTQyN30.DgN07c1fSJg9xzw9wMuIfe-uQRLegMwXCD-feEKSndI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
