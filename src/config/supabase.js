import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { setupURLPolyfill } from 'react-native-url-polyfill'

const supabaseUrl = "https://ddhqtepvmjgbfndcjrkn.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkaHF0ZXB2bWpnYmZuZGNqcmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4NzM5NTgsImV4cCI6MTk4MDQ0OTk1OH0.uuVn05WPl3_hJ6kKGVmcFBNnAusWgW_vnotSFDC_VQ4";
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
