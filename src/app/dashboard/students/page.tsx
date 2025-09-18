'use client';
import React, { useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StudentCreateDialog from "@/components/student/student.create.dialog";
import { useStudentsStore } from "@/store/use-students";
import { Student } from "@/types/student";
import { AiOutlineLoading } from "react-icons/ai";


export default function StudentsPage() {
  const { students, fetchStudents, deleteStudent } = useStudentsStore();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [queue, setQueue] = React.useState<string[]>([]);
  const [editStudent, setEditStudent] = React.useState<Student | null>(null);

  React.useEffect(() => {
    fetchStudents();
  }, []);

  // Ensure students is always an array
  const filteredStudents = useMemo(() => (students || []).filter(s =>
    s.name?.toLowerCase().includes(filter.toLowerCase()) ||
    s.email?.toLowerCase().includes(filter.toLowerCase())
  ), [students, filter]);


  async function onEditStudent(student: Student) {
    setEditStudent(student);
    setOpenDialog(true);
  }

  async function onDeleteStudent(id: string) {
    setQueue(prev => [...prev, id]);
    await deleteStudent(id);
    setQueue(prev => prev.filter(pid => pid !== id));
  }

  function checkQueueStatus(id: string) {
    return queue.includes(id);
  }

  function getColorByStatus(status: string) {
    switch (status) {
      case "ACTIVE":
        return "bg-green-50 text-green-600";
      case "INACTIVE":
        return "bg-gray-50 text-gray-600";
      case "PENDING":
        return "bg-yellow-50 text-yellow-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  }

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
                  <span className={`px-3 py-1 rounded text-xs ${getColorByStatus(s.status)}`}>{s.status}</span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="default" size="sm" disabled={checkQueueStatus(s.id)} onClick={() => onEditStudent(s)}>
                    {checkQueueStatus(s.id) && <AiOutlineLoading className="animate-spin" />}
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" disabled={checkQueueStatus(s.id)} onClick={() => onDeleteStudent(s.id)}>
                    {checkQueueStatus(s.id) && <AiOutlineLoading className="animate-spin" />}
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <StudentCreateDialog
        mode={editStudent ? "EDIT" : "ADD"}
        data={editStudent}
        open={openDialog}
        onOpenChange={(value) => {
          setEditStudent(null);
          setOpenDialog(value);
        }}
      />
    </div>
  );
}
