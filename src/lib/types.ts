export interface Subject {
  id: string;
  name: string;
  teacher: string;
  requirement: number; // as percentage
  totalClasses: number;
  present: number;
  absent: number;
}
