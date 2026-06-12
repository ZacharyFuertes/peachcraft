# Email Verification & User Profiles Setup Guide

## Overview

The enhanced registration system now includes:
- Email verification to prevent bot attacks
- User profiles with additional information (username, address)
- Enhanced signup form with username, email, address, password fields
- Email verification before login

## Supabase Database Setup

### 1. Create the Profiles Table

Run this SQL in your Supabase SQL Editor to create the required `profiles` table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID NOT NULL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  address TEXT,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT fk_profiles_auth_user FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for users to read their own profile
CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy for authenticated users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create indexes for faster lookups
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_email_verified ON profiles(email_verified);
```

### 2. Configure Email Verification in Supabase

1. Go to your Supabase dashboard
2. Navigate to **Authentication → Settings**
3. Under **Email Auth → Verification**, enable:
   - ✅ **Confirm email** (required)
   - Set **Email Change Token Expiration** to 24 hours (or your preferred duration)
   - Set **Email OTP Token Expiration** to 24 hours

### 3. Configure Email Templates (Optional but Recommended)

In Supabase Auth Settings, customize the email template:

1. Go to **Authentication → Email Templates**
2. Edit the "Confirm signup" template
3. Replace the default link with:

```
{{ .ConfirmationURL }}
```

Or customize with your app branding:

```html
<p>Welcome to Peach Craft!</p>
<p>Please confirm your email address by clicking the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Verify Email Address</a></p>
<p>This link expires in 24 hours.</p>
```

## New Features

### Enhanced Signup Form

The signup page now collects:
- **Username** - Unique identifier for the user (2-50 characters)
- **Email** - Email address with verification requirement (must be valid)
- **Shipping Address** - Default address for orders (5-200 characters)
- **Password** - With strength requirement (minimum 8 characters)
- **Confirm Password** - Password confirmation to prevent typos

### Email Verification Flow

1. User fills out signup form
2. Server validates all inputs with Zod
3. User account created in Supabase Auth with email verification enabled
4. Profile record created in `profiles` table with `email_verified: false`
5. Verification email sent to user
6. User clicks link in email → redirected to `/verify-email`
7. `/verify-email` route processes the token and marks email as verified
8. User can now log in

### Login Verification

When logging in:
1. Credentials validated with Supabase Auth
2. System checks `profiles.email_verified` status
3. If not verified, shows error: "Your email has not been verified yet..."
4. Once verified, user can access their account

## Environment Variables

No new environment variables needed. Uses existing:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## File Changes

### New Files
- `src/routes/verify-email.tsx` - Email verification page
- `REGISTRATION_SETUP_GUIDE.md` - This guide

### Modified Files
- `src/routes/signup.tsx` - Enhanced form with new fields
- `src/routes/login.tsx` - Added email verification check
- `src/lib/supabase.ts` - Added Profile type
- `src/lib/api/supabase.functions.ts` - Added three new server functions:
  - `signUpWithProfile()` - Registers user with profile
  - `verifyEmail()` - Processes email verification token
  - `checkEmailVerification()` - Checks if email is verified

## Security Features

### Bot/DDoS Prevention

1. **Email Verification Required**
   - Prevents automated bot account creation
   - Validates email ownership
   - Rate-limited by email provider

2. **Password Requirements**
   - Minimum 8 characters
   - Client-side validation for UX
   - Server-side validation for security

3. **Username Uniqueness**
   - Prevents username squatting
   - Enforced at database level with UNIQUE constraint

4. **Profile Linkage**
   - Foreign key constraint on auth.users(id)
   - Prevents orphaned profiles
   - Cascade delete on user account removal

## Testing the Flow

### Test 1: Complete Signup

1. Navigate to `/signup`
2. Fill in form:
   - Username: `testuser123`
   - Email: `your-test-email@gmail.com` (use a real email you can check)
   - Address: `123 Main Street, Manila, NCR 1000`
   - Password: `SecurePassword123`
   - Confirm: `SecurePassword123`
3. Click "Create account"
4. Should see success message: "Account created! Check your email..."
5. Check your email inbox for verification link
6. Click the verification link
7. Should see success page with "Email verified successfully!"

### Test 2: Email Verification Required

1. Try logging in with unverified email
2. Should see error: "Your email has not been verified yet..."

### Test 3: Duplicate Email Prevention

1. Try signing up with an email that already exists
2. Should see error: "An account with this email already exists"

### Test 4: Duplicate Username Prevention

1. Try signing up with a username that already exists
2. Should see error: "This username is already taken"

### Test 5: Password Validation

1. Try password less than 8 characters
2. Should see error: "Password must be at least 8 characters"
3. Try passwords that don't match
4. Should see error: "Passwords do not match"

## Troubleshooting

### Email not arriving

**Cause:** Supabase email service not configured or in development mode
**Solution:** 
- Check Supabase → Authentication → Email → Provider settings
- In development, you might see a preview link instead of email
- For production, use SendGrid or another email provider

### "User already exists" error during signup

**Cause:** User was partially created in previous failed attempt
**Solution:** 
- Delete the user from Supabase Auth dashboard manually
- Or use admin API to clean up: `supabase.auth.admin.deleteUser()`

### Verification token expired

**Cause:** User clicked link more than 24 hours after signup
**Solution:** 
- User can sign up again with same email (will override old account)
- Or use "Forgot password" flow to verify and reset

### Can't find email in database

**Cause:** Email might be stored in different case
**Solution:** Query should be case-insensitive:
```sql
SELECT * FROM profiles WHERE LOWER(email) = LOWER('user@example.com');
```

## Customization

### Change Email Verification Expiration

Edit in `src/lib/api/supabase.functions.ts` → `signUpWithProfile`:
```typescript
options: {
  emailRedirectTo: `...`, // Add redirect URL
  // Configure token expiration in Supabase Auth settings instead
}
```

### Change Password Minimum Length

Edit in `src/lib/api/supabase.functions.ts`:
```typescript
password: z.string().min(12, "Password must be at least 12 characters"),
```

### Custom Email Template

Edit in Supabase → Authentication → Email Templates → "Confirm signup"

### Username Validation Rules

Edit in `src/routes/signup.tsx` and `src/lib/api/supabase.functions.ts`:
```typescript
username: z.string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username is too long")
  .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, dashes, and underscores"),
```

## Database Schema Reference

### profiles table

```
id (UUID, Primary Key) ──── Foreign key to auth.users
username (TEXT, Unique) ─── User's chosen username
email (TEXT, Unique) ─────── Email address
address (TEXT) ──────────── Shipping address
email_verified (BOOLEAN) ─── Email verification status
created_at (TIMESTAMPTZ) ─── Account creation timestamp
updated_at (TIMESTAMPTZ) ─── Last update timestamp

Indexes:
  - idx_profiles_email
  - idx_profiles_username
  - idx_profiles_email_verified

RLS Policies:
  - Users can read their own profile
  - Users can update their own profile
```

## Next Steps

1. **Run the SQL** to create the profiles table
2. **Configure email verification** in Supabase settings
3. **Test the signup flow** following the testing checklist
4. **Deploy** the changes to production
5. **Monitor email delivery** to ensure users receive verification links

## Future Enhancements

- **2FA (Two-Factor Authentication)** - Add SMS or authenticator support
- **OAuth** - Add Google/GitHub sign-in options
- **Social Verification** - Require review before high-risk accounts can checkout
- **Fraud Detection** - Monitor signup patterns and flag suspicious activity
- **Password Reset** - Secure password reset flow with email verification
