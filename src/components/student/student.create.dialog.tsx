import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateStudentPayload, Student } from "@/types/student";
import { useStudentsStore } from "@/store/use-students";
import { AiOutlineLoading } from "react-icons/ai";
export interface StudentCreateDialogProps {
  open: boolean;
  mode: "EDIT" | "ADD";
  data: Student | null;
  onOpenChange: (open: boolean) => void;
}

export default function StudentCreateDialog({ open, onOpenChange, mode, data }: StudentCreateDialogProps) {
  const { addStudent, updateStudent } = useStudentsStore();
  const [isPending, setIsPending] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    role: "STUDENT" as "STUDENT" | "INSTRUCTOR",
    address: "",
  });

  React.useEffect(() => {
    if (mode === "EDIT" && data) {
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        role: data.role || "STUDENT",
        address: data.address || "",
      });
    } else {
      setForm({ name: "", phone: "", email: "", role: "STUDENT", address: "" });
    }
  }, [mode, data, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    if (mode === "EDIT" && data) {
      await updateStudent({ id: data.id, ...form } as Student);
    } else if (mode === "ADD")
      await addStudent(form);

    setIsPending(false);
    onOpenChange(false);
    setForm({ name: "", phone: "", email: "", role: "STUDENT", address: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">Create Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Student Name</label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Phone Number</label>
            <Input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Email Address</label>
            <Input name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Role</label>
            <Input name="role" value={form.role} onChange={handleChange} required />
          </div>
          <div className="flex-col gap-2 col-span-2 flex">
            <label className="font-medium">Address</label>
            <Input name="address" value={form.address} onChange={handleChange} required />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white" >
            {isPending && <AiOutlineLoading className="animate-spin" />}
            {
              mode === "EDIT" ?
                isPending ? "Updating..." : "Update" :
                isPending ? "Creating..." : "Create"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
