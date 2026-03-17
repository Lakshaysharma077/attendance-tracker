'use client';

import { useCallback } from 'react';
import type { Subject } from '@/lib/types';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useSubjects(userId?: string) {
  const firestore = useFirestore();

  const subjectsCollection = useMemoFirebase(() => {
    if (!firestore || !userId) return null;
    return collection(firestore, 'users', userId, 'subjects');
  }, [firestore, userId]);

  const {
    data: subjects,
    isLoading,
    error,
  } = useCollection<Subject>(subjectsCollection);

  const addSubject = useCallback(
    async (subject: Omit<Subject, 'id' | 'present' | 'absent'>) => {
      if (!subjectsCollection) return;
      const newSubject = {
        ...subject,
        present: 0,
        absent: 0,
        lastUpdated: new Date().toISOString(),
      };
      try {
        await addDoc(subjectsCollection, newSubject);
      } catch (err) {
        const permissionError = new FirestorePermissionError({
          path: subjectsCollection.path,
          operation: 'create',
          requestResourceData: newSubject,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw err;
      }
    },
    [subjectsCollection]
  );

  const updateSubject = useCallback(
    async (updatedSubject: Subject) => {
      if (!firestore || !userId) return;
      const { id, ...data } = updatedSubject;
      const subjectRef = doc(firestore, 'users', userId, 'subjects', id);
      try {
        await updateDoc(subjectRef, {
          ...data,
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        const permissionError = new FirestorePermissionError({
          path: subjectRef.path,
          operation: 'update',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw err;
      }
    },
    [firestore, userId]
  );

  const deleteSubject = useCallback(
    (id: string) => {
      if (!firestore || !userId) return;
      const subjectRef = doc(firestore, 'users', userId, 'subjects', id);
      deleteDoc(subjectRef).catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: subjectRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    },
    [firestore, userId]
  );

  const handlePresent = useCallback(
    async (id: string) => {
      if (!firestore || !userId) return;
      const subjectRef = doc(firestore, 'users', userId, 'subjects', id);
      const attendanceCollectionRef = collection(subjectRef, 'attendance');
      const newAttendanceRef = doc(attendanceCollectionRef);

      const batch = writeBatch(firestore);

      const attendanceRecord = {
        date: new Date().toISOString(),
        status: 'present' as const,
      };
      batch.set(newAttendanceRef, attendanceRecord);

      const subjectUpdates = {
        present: increment(1),
        lastUpdated: new Date().toISOString(),
      };
      batch.update(subjectRef, subjectUpdates);

      try {
        await batch.commit();
      } catch (err) {
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: newAttendanceRef.path,
            operation: 'create',
            requestResourceData: attendanceRecord,
          })
        );
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: subjectRef.path,
            operation: 'update',
            requestResourceData: { present: 'increment(1)' },
          })
        );
        throw err;
      }
    },
    [firestore, userId]
  );

  const handleAbsent = useCallback(
    async (id: string) => {
      if (!firestore || !userId) return;
      const subjectRef = doc(firestore, 'users', userId, 'subjects', id);
      const attendanceCollectionRef = collection(subjectRef, 'attendance');
      const newAttendanceRef = doc(attendanceCollectionRef);

      const batch = writeBatch(firestore);

      const attendanceRecord = {
        date: new Date().toISOString(),
        status: 'absent' as const,
      };
      batch.set(newAttendanceRef, attendanceRecord);

      const subjectUpdates = {
        absent: increment(1),
        lastUpdated: new Date().toISOString(),
      };
      batch.update(subjectRef, subjectUpdates);

      try {
        await batch.commit();
      } catch (err) {
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: newAttendanceRef.path,
            operation: 'create',
            requestResourceData: attendanceRecord,
          })
        );
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: subjectRef.path,
            operation: 'update',
            requestResourceData: { absent: 'increment(1)' },
          })
        );
        throw err;
      }
    },
    [firestore, userId]
  );

  const updateAttendanceStatus = useCallback(
    async (
      subjectId: string,
      attendanceId: string,
      oldStatus: 'present' | 'absent'
    ) => {
      if (!firestore || !userId) return;

      const newStatus = oldStatus === 'present' ? 'absent' : 'present';
      const subjectRef = doc(firestore, 'users', userId, 'subjects', subjectId);
      const attendanceRef = doc(subjectRef, 'attendance', attendanceId);

      const batch = writeBatch(firestore);

      // Update attendance record status
      batch.update(attendanceRef, { status: newStatus });

      // Update aggregate counts on the subject
      const subjectUpdates = {
        present: increment(newStatus === 'present' ? 1 : -1),
        absent: increment(newStatus === 'absent' ? 1 : -1),
        lastUpdated: new Date().toISOString(),
      };
      batch.update(subjectRef, subjectUpdates);

      try {
        await batch.commit();
      } catch (err) {
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: attendanceRef.path,
            operation: 'update',
            requestResourceData: { status: newStatus },
          })
        );
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: subjectRef.path,
            operation: 'update',
            requestResourceData: {
              present: `increment(${newStatus === 'present' ? 1 : -1})`,
              absent: `increment(${newStatus === 'absent' ? 1 : -1})`,
            },
          })
        );
        throw err;
      }
    },
    [firestore, userId]
  );

  return {
    subjects: subjects || [],
    addSubject,
    updateSubject,
    deleteSubject,
    handlePresent,
    handleAbsent,
    updateAttendanceStatus,
    isLoaded: !isLoading,
    error,
  };
}
