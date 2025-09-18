import { create } from "zustand";

interface AuthState {
  loading: boolean;
  error: string | null;
  user: {
    phone?: string;
    email?: string;
    role?: string;
    token?: string;
  } | null;
  signIn: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  loading: false,
  error: null,
  user: null,

  async signIn(phone: string) {
    set({ loading: true, error: null });
    try {
      // Gọi API gửi mã xác thực về điện thoại
      // await fetch("/api/auth/signin", { method: "POST", body: JSON.stringify({ phone }) });
      // Dummy: giả lập gửi mã thành công
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.message || "Sign in error", loading: false });
    }
  },

  async verifyCode(phone: string, code: string) {
    set({ loading: true, error: null });
    try {
      // Gọi API xác thực mã
      // const res = await fetch("/api/auth/verify", { method: "POST", body: JSON.stringify({ phone, code }) });
      // const data = await res.json();
      // set({ user: data.user, loading: false });
      // Dummy: giả lập xác thực thành công
      set({
        user: { phone, role: "student", token: "dummy-token" },
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Verify error", loading: false });
    }
  },

  async verifyEmail(email: string, code: string) {
    set({ loading: true, error: null });
    try {
      // Gọi API xác thực mã email
      // const res = await fetch("/api/auth/verify-email", { method: "POST", body: JSON.stringify({ email, code }) });
      // const data = await res.json();
      // set({ user: data.user, loading: false });
      // Dummy: giả lập xác thực thành công
      set({
        user: { email, role: "student", token: "dummy-token" },
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Verify email error", loading: false });
    }
  },

  signOut() {
    set({ user: null });
  },
}));
