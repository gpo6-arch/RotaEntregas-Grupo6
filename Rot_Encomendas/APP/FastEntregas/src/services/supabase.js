// src/services/supabase.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ajtcuyjksmkpdhenreka.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqdGN1eWprc21rcGRoZW5yZWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzIzOTgsImV4cCI6MjA3OTY0ODM5OH0.6ksUz1wRIKta6U63xngb00MIq6zHUKwP4M0_Dtkz-GQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
