'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { AttendanceRecord } from '@/lib/types';

export function useAttendanceHistory(userId?: string, subjectId?: string) {
  const firestore = useFirestore();

  const attendanceCollection = useMemoFirebase(() => {
    if (!firestore || !userId || !subjectId) return null;
    const ref = collection(
      firestore,
      'users',
      userId,
      'subjects',
      subjectId,
      'attendance'
    );
    return query(ref, orderBy('date', 'desc'));
  }, [firestore, userId, subjectId]);

  const {
    data: records,
    isLoading,
    error,
  } = useCollection<AttendanceRecord>(attendanceCollection);

  return {
    records: records || [],
    isLoading,
    error,
  };
}
