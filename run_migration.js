import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// Create Supabase client with service role
const supabase = createClient(supabaseUrl, serviceRoleKey);

// Read migration file
const migrationSql = fs.readFileSync('./sql/migrations/004_update_website_settings_social_fields.sql', 'utf-8');

console.log('Running migration: 004_update_website_settings_social_fields.sql\n');
console.log('SQL:', migrationSql);

// Execute migration
(async () => {
  try {
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSql });
    
    if (error) {
      console.error('Migration error:', error);
      process.exit(1);
    }
    
    console.log('\n✓ Migration executed successfully!');
    
    // Verify new columns exist
    const { data: tableInfo, error: checkError } = await supabase
      .from('website_settings')
      .select('*')
      .limit(0);
    
    if (checkError) {
      console.error('Schema check error:', checkError);
      process.exit(1);
    }
    
    console.log('✓ Schema verified');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
