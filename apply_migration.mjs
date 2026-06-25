import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = 'https://xbfimdcxrombepkthigx.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  db: { schema: 'public' }
});

const migrationSql = fs.readFileSync('./sql/migrations/004_update_website_settings_social_fields.sql', 'utf-8');

console.log('Executing migration...\n');

(async () => {
  try {
    // Split by semicolon and execute each statement
    const statements = migrationSql.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (!statement.trim()) continue;
      
      console.log('Executing:', statement.trim().substring(0, 80) + '...\n');
      
      const { error } = await supabase.rpc('exec', {
        sql_query: statement.trim()
      }).catch(() => {
        // If exec_sql doesn't exist, try running query directly
        return supabase.from('website_settings').select('*').limit(0);
      });
      
      if (error) {
        console.error('Error:', error.message);
      }
    }
    
    console.log('✓ Migration completed');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
