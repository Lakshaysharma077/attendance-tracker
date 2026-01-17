export interface Subject {
  id: string;
  name: string;
  teacher: string;
  requirement: number; // as percentage
  present: number;
  absent: number;
}
