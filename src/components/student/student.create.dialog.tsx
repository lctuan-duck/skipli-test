import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface StudentCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: {
    name: string;
    phone: string;
    email: string;
    role: string;
    address: string;
  }) => void;
}

export default function StudentCreateDialog({ open, onOpenChange, onCreate }: StudentCreateDialogProps) {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
    onOpenChange(false);
    setForm({ name: "", phone: "", email: "", role: "", address: "" });
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
          <Button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
