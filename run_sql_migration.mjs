import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key);

const sql = `
ALTER TABLE website_settings
ADD COLUMN IF NOT EXISTS instagram_username TEXT,
ADD COLUMN IF NOT EXISTS tiktok_username TEXT,
ADD COLUMN IF NOT EXISTS tiktok_url TEXT;

ALTER TABLE website_settings
DROP COLUMN IF EXISTS facebook_url,
DROP COLUMN IF EXISTS twitter_url;

UPDATE website_settings SET updated_at = now() WHERE id = 'singleton';
`;

(async () => {
  try {
    // Use query to execute raw SQL via pg_net or similar
    const { data, error } = await supabase.rpc('query', { query: sql });
    
    if (error) {
      console.error('RPC Error:', error);
      // Try alternative: check if exec_sql exists
      const { data: d2, error: e2 } = await supabase.rpc('exec_sql', { sql });
      if (e2) console.error('exec_sql error:', e2);
      else console.log('exec_sql result:', d2);
    } else {
      console.log('Migration successful:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
