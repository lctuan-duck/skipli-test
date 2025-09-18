import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { CreateStudentPayload, Student } from "@/types/student";

interface StoreState {
  currentStudent: Student | null;
  students: Student[];
  error: string | null;
  fetchStudents: () => Promise<void>;
  addStudent: (student: CreateStudentPayload) => Promise<void>;
  updateStudent: (student: Partial<Student>) => Promise<void>;
  deleteStudent: (email: string) => Promise<void>;
}

export const useStudentsStore = create<StoreState>((set, get) => ({
  currentStudent: null,
  students: [],
  error: null,

  async fetchStudents() {
    set({ error: null });
    try {
      const res = await axiosInstance.get<{ data: Student[] }>(
        `/api/instructor/students`
      );
      const result = res.data.data;

      if (!Array.isArray(result)) throw new Error("Invalid data format");

      set({ students: result });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message || "Error" });
      }
      set({ error: "unknown error" });
    }
  },

  async fetchStudentByPhone(phone: string) {
    set({ error: null });
    try {
      const res = await axiosInstance.get<Student>(
        `/api/instructor/student/${phone}`
      );
      const result = res.data;

      set({ currentStudent: result });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message || "Error" });
      }
      set({ error: "unknown error" });
    }
  },

  async addStudent(student: CreateStudentPayload) {
    set({ error: null });
    try {
      await axiosInstance.post(`/api/instructor/student`, student);
      await get().fetchStudents();
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message || "Error" });
      }
      set({ error: "unknown error" });
    }
  },
  async updateStudent(student: Partial<Student>) {
    set({ error: null });
    try {
      const { id, ...rest } = student;
      await axiosInstance.put(`/api/instructor/student/${id}`, rest);
      await get().fetchStudents();
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message || "Error" });
      }
      set({ error: "unknown error" });
    }
  },

  async deleteStudent(phone: string) {
    set({ error: null });
    try {
      await axiosInstance.delete(`/api/instructor/student/${phone}`);
      await get().fetchStudents();
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message || "Error" });
      }
      set({ error: "unknown error" });
    }
  },
}));
