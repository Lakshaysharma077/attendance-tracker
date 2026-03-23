'use client';

import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { AttendanceRecord } from '@/lib/types';

export function useAttendanceHistory(userId?: string, subjectId?: string, enabled = true) {
  const firestore = useFirestore();

  const shouldSubscribe = Boolean(enabled && userId && subjectId);

  const attendanceCollection = useMemoFirebase(() => {
    if (!firestore || !shouldSubscribe || !userId || !subjectId) return null;
    const ref = collection(
      firestore,
      'users',
      userId,
      'subjects',
      subjectId,
      'attendance'
    );
    return query(ref, orderBy('date', 'desc'));
  }, [firestore, shouldSubscribe, userId, subjectId]);

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