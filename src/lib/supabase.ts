import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://curnwqgxvinolwjysekv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cm53cWd4dmlub2x3anlzZWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTExMzksImV4cCI6MjA1OTMyNzEzOX0.-G2FwxEi9sIScuF3Act4tuyeGhyvJ-Ree7uW0QsWAIg';

export const supabase = createClient(supabaseUrl, supabaseKey);
