import React, { useState } from "react";
import { Edit3, Save, Upload } from "lucide-react";

export default function Attendance() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("Enter Subject");
  const [batch, setBatch] = useState("Enter Batch Number");
  const [isEditing, setIsEditing] = useState(false);
  const [attendance, setAttendance] = useState([
    { roll: "2201001", name: "Agrahari Dhruv", records: [true, true, false, true, false] },
    { roll: "2201002", name: "John Doe", records: [false, true, true, false, true] },
  ]);

  const toggleAttendance = (studentIndex: number, recordIndex: number) => {
    if (!isEditing) return;
    setAttendance((prev) => {
      const updated = [...prev];
      updated[studentIndex].records[recordIndex] = !updated[studentIndex].records[recordIndex];
      return updated;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Attendance Management</h1>
      </div>

      {/* File Upload Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Attendance Data</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div
            className={`max-w-lg mx-auto flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
              isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileSelect}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">Image files (JPG, PNG) up to 10MB</p>
            </div>
          </div>
          {selectedFile && (
            <div className="mt-4">
              <div className="flex flex-col items-center bg-gray-50 p-4 rounded-md">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                  className="max-h-96 object-contain rounded-md"
                />
                <span className="mt-2 text-sm font-medium text-gray-900">{selectedFile.name}</span>
                <button
                  type="button"
                  className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                  onClick={() => setSelectedFile(null)}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Attendance Management</h1>
        <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          {isEditing ? <Save size={16} className="inline mr-2" /> : <Edit3 size={16} className="inline mr-2" />}
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Editable Fields */}
      <div className="flex space-x-4">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-md"
          placeholder="Enter Subject"
        />
        <input
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-md"
          placeholder="Enter Batch Number"
        />
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Attendance Records</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  {['05/02', '07/02', '21/02', '26/02', '28/02'].map((date) => (
                    <th key={date} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance.map((student, studentIndex) => (
                  <tr key={student.roll}>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.roll}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                    {student.records.map((present, recordIndex) => (
                      <td
                        key={recordIndex}
                        className="px-6 py-4 text-sm"
                        onClick={() => toggleAttendance(studentIndex, recordIndex)}
                      >
                        <span className={`px-2 py-1 text-xs rounded-full cursor-pointer ${present ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {present ? "Present" : "Absent"}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
