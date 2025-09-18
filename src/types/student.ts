export interface Student {
  id: string;
  email: string;
  phone: string;
  name: string;
  address?: string;
  role: "STUDENT" | "INSTRUCTOR";
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  createdAt?: {
    type: string;
    seconds: number;
    nanoseconds: number;
  };
}

export type CreateStudentPayload = Omit<Student, "id" | "status" | "createdAt">;
