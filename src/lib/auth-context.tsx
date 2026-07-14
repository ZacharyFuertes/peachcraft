import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthState>({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
});

function withTimeout<T>(promise: Promise<T>, ms: number, msg?: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(msg ?? `Timed out after ${ms}ms`)), ms),
    ),
  ]);
}

/** Return null if the session's access_token has already expired. */
function validSession(session: Session | null): Session | null {
  if (!session) return null;
  if (!session.expires_at) return session;
  // expires_at is a Unix timestamp (seconds). Add a 10-second buffer
  // so sessions on the very edge of expiry aren't considered valid.
  if (session.expires_at + 10 < Math.floor(Date.now() / 1000)) return null;
  return session;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const supabase = getSupabaseClient();

    withTimeout(supabase.auth.getSession(), 5000, "Session check timed out")
      .then(({ data: { session: raw } }) => {
        if (!mountedRef.current) return;
        const valid = validSession(raw);
        setSession(valid);
        setUser(valid?.user ?? null);
      })
      .catch(() => {
        if (!mountedRef.current) return;
        setSession(null);
        setUser(null);
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mountedRef.current) return;
      const valid = validSession(session);
      setSession(valid);
      setUser(valid?.user ?? null);
    });

    return () => {
      mountedRef.current = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
