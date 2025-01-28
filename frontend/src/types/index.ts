// Authentication Types
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Schedule Types
export interface Lecture {
  id: string;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  roomNumber: string;
  instructor: string;
  status: 'previous' | 'upcoming';
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
  timeIn?: string;
  timeOut?: string;
}

// Statistics Types
export interface SubjectStatistics {
  subjectId: string;
  subjectName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
}

export interface StudentStatistics {
  studentId: string;
  studentName: string;
  attendance: SubjectStatistics[];
  overallPercentage: number;
  requiredLectures: number;
}