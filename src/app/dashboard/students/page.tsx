'use client';
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StudentCreateDialog from "@/components/student/student.create.dialog";
import { useStudentsStore } from "@/store/use-students";

export default function StudentsPage() {
  const { students, fetchStudents, addStudent, loading } = useStudentsStore();
  const [filter, setFilter] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  React.useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.email.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreateStudent = (data: any) => {
    addStudent({ name: data.name, email: data.email, status: "Active" });
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Manage Students</h1>
      <div className="bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-lg">{filteredStudents.length} Students</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenDialog(true)}>
              + Add Student
            </Button>
            <input
              type="text"
              placeholder="Filter"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2 border rounded text-sm focus:outline-none"
              style={{ minWidth: 120 }}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 rounded bg-green-50 text-green-600 text-xs">{s.status}</span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="default" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <StudentCreateDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreate={handleCreateStudent}
      />
    </div>
  );
}
