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
    (subject: Omit<Subject, 'id' | 'present' | 'absent'>) => {
      if (!subjectsCollection) return;
      const newSubject = {
        ...subject,
        present: 0,
        absent: 0,
      };
      addDoc(subjectsCollection, newSubject).catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: subjectsCollection.path,
          operation: 'create',
          requestResourceData: newSubject,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    },
    [subjectsCollection]
  );

  const updateSubject = useCallback(
    (updatedSubject: Subject) => {
      if (!firestore || !userId) return;
      const { id, ...data } = updatedSubject;
      const subjectRef = doc(firestore, 'users', userId, 'subjects', id);
      updateDoc(subjectRef, {
        ...data,
        lastUpdated: new Date().toISOString(),
      }).catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: subjectRef.path,
          operation: 'update',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
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
    (id: string) => {
      if (!firestore || !userId) return;
      const subjectRef = doc(firestore, 'users', userId, 'subjects', id);
      updateDoc(subjectRef, {
        present: increment(1),
        lastUpdated: new Date().toISOString(),
      }).catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: subjectRef.path,
          operation: 'update',
          requestResourceData: { present: 'increment(1)' },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    },
    [firestore, userId]
  );

  const handleAbsent = useCallback(
    (id: string) => {
      if (!firestore || !userId) return;
      const subjectRef = doc(firestore, 'users', userId, 'subjects', id);
      updateDoc(subjectRef, {
        absent: increment(1),
        lastUpdated: new Date().toISOString(),
      }).catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: subjectRef.path,
          operation: 'update',
          requestResourceData: { absent: 'increment(1)' },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
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
    isLoaded: !isLoading,
    error,
  };
}
