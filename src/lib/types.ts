export interface Subject {
  id: string;
  name: string;
  teacher: string;
  requirement: number; // as percentage
  totalClasses: number;
  present: number;
  absent: number;
  lastUpdated?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // ISO string
  status: 'present' | 'absent';
}
