'use client';

import { useState, useEffect } from 'react';
import {
  onSnapshot,
  Query,
  DocumentData,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection<T>(q: Query | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const data: T[] = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(data);
        setIsLoading(false);
      },
      async err => {
        console.error(err);
        const permissionError = new FirestorePermissionError({
          path: (q as CollectionReference).path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, isLoading, error };
}
