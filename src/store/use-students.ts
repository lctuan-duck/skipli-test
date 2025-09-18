import { create } from "zustand";

// Kiểu dữ liệu cho student
export interface Student {
  name: string;
  email: string;
  status: string;
  phone?: string;
  role?: string;
  address?: string;
}

interface StoreState {
  students: Student[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  addStudent: (student: Student) => Promise<void>;
  deleteStudent: (email: string) => Promise<void>;
  // ...các hàm khác nếu cần
}

export const useStudentsStore = create<StoreState>((set, get) => ({
  students: [],
  loading: false,
  error: null,

  async fetchStudents() {
    set({ loading: true, error: null });
    try {
      // Gọi API lấy danh sách học viên
      // const res = await fetch("/api/students");
      // const data = await res.json();
      // set({ students: data, loading: false });
      // Dummy data
      set({
        students: [
          { name: "Student 1", email: "123@gmail.com", status: "Active" },
          { name: "Student 2", email: "123@gmail.com", status: "Active" },
          { name: "Student 3", email: "123@gmail.com", status: "Active" },
          { name: "Student 4", email: "123@gmail.com", status: "Active" },
        ],
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Error", loading: false });
    }
  },

  async addStudent(student: Student) {
    set({ loading: true, error: null });
    try {
      // Gọi API thêm học viên
      // await fetch("/api/students", { method: "POST", body: JSON.stringify(student) });
      set({ students: [student, ...get().students], loading: false });
    } catch (err: any) {
      set({ error: err.message || "Error", loading: false });
    }
  },

  async deleteStudent(email: string) {
    set({ loading: true, error: null });
    try {
      // Gọi API xoá học viên
      // await fetch(`/api/students/${email}`, { method: "DELETE" });
      set({
        students: get().students.filter((s: Student) => s.email !== email),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Error", loading: false });
    }
  },
}));
