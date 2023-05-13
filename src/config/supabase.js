import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { setupURLPolyfill } from 'react-native-url-polyfill'

const supabaseUrl = "https://hzxtdbfpqbdznmitwgri.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eHRkYmZwcWJkem5taXR3Z3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0NDc1NzEsImV4cCI6MTk4NzAyMzU3MX0.Us0wxNljqKMLxwPuWaKzOjl-F-5YrkdLqBKLbFqyt2g";

setupURLPolyfill()

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        detectSessionInUrl: false,
        storage: AsyncStorage,
      },
    }
  );
