import { API_URL } from "@/constants";
import { create } from "zustand";
import axiosInstance from "@/lib/axios";

interface AuthState {
  user: {
    phone?: string;
    email?: string;
    role?: string;
    token?: string;
  } | null;
  signInWithPhoneNumber: (phone: string) => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  verifyPhoneNumber: (phone: string, code: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: (() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  })(),

  async signInWithPhoneNumber(phone: string) {
    try {
      await axiosInstance.post(`/api/auth/access-code/${phone}`);
    } catch (err) {
      throw err;
    }
  },
  async signInWithEmail(email: string) {
    try {
      await axiosInstance.post(`/api/auth/email/login`, { email });
    } catch (err) {
      throw err;
    }
  },

  async verifyPhoneNumber(phone: string, code: string) {
    try {
      await axiosInstance.post(`/api/auth/phone/validate-access-code`, {
        phone,
        accessCode: code,
      });
      const user = { phone, role: "student" };
      set({ user });
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      throw err;
    }
  },

  async verifyEmail(email: string, code: string) {
    try {
      await axiosInstance.post(`/api/auth/email/validate-access-code`, {
        email,
        accessCode: code,
      });
      const user = { email, role: "student" };
      set({ user });
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      throw err;
    }
  },

  signOut() {
    set({ user: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  },
}));
