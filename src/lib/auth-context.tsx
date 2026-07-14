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

/** Return null if the session's access_token has already expired.
 *  Uses a 24-hour buffer so that even long-lived tokens set in the
 *  Supabase dashboard (e.g. 24h) aren't prematurely rejected. */
function validSession(session: Session | null): Session | null {
  if (!session) return null;
  if (!session.expires_at) return session;
  if (session.expires_at + 86400 < Math.floor(Date.now() / 1000)) return null;
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

    // Listen for handleSignOut's manual clear so the context updates
    // even if the network signOut() call never resolves.
    const onAuthCleared = () => {
      if (!mountedRef.current) return;
      setSession(null);
      setUser(null);
    };
    window.addEventListener("peachcraft-auth-cleared", onAuthCleared);

    // Lightweight background refresh when the user returns to the tab.
    // With autoRefreshToken disabled, the token never auto-refreshes,
    // so after a long idle/window switch the stored session may be near
    // or past expiry. This tries a 3-second refresh on visibilitychange.
    // If the refresh endpoint hangs (same root cause as the original bug),
    // the timeout fires and the user keeps their current session — no logout.
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      if (refreshTimer) clearTimeout(refreshTimer);
      // Debounce: wait 500ms after the tab becomes visible, so rapid
      // tab-switching doesn't fire multiple refresh attempts.
      refreshTimer = setTimeout(() => {
        if (!mountedRef.current) return;
        withTimeout(supabase.auth.refreshSession(), 3000, "Refresh timed out")
          .then(({ data: { session: raw } }) => {
            if (!mountedRef.current) return;
            const valid = validSession(raw);
            if (valid) {
              setSession(valid);
              setUser(valid.user);
            }
          })
          .catch(() => {
            // Timeout or network failure — keep the current session as-is,
            // don't log the user out.
          });
      }, 500);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      mountedRef.current = false;
      listener.subscription.unsubscribe();
      window.removeEventListener("peachcraft-auth-cleared", onAuthCleared);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (refreshTimer) clearTimeout(refreshTimer);
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
