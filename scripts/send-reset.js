#!/usr/bin/env node
(async () => {
  const { createClient } = await import('@supabase/supabase-js');
  const SUPABASE_URL = 'https://ougnocasnqaiayirjjsg.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91Z25vY2FzbnFhaWF5aXJqanNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTU1MTcsImV4cCI6MjA3MTQzMTUxN30.OlSPeXbmHi5X7Fl4E5bQDy8A_JcIaUUPXdLcvhTbC6A';

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const email = 'nmarathuss@gmail.com';
  const redirectTo = 'http://localhost:8080/auth';

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      console.error('Failed to send reset email:', error.message || error);
      process.exitCode = 1;
      return;
    }
    console.log('Reset email request sent successfully.');
    console.log('Supabase response:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exitCode = 1;
  }
})();
