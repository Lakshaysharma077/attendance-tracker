'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Subject } from '@/lib/types';

const STORAGE_KEY = 'classTrackSubjects';

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedSubjects = localStorage.getItem(STORAGE_KEY);
      if (storedSubjects) {
        setSubjects(JSON.parse(storedSubjects));
      }
    } catch (error) {
      console.error('Failed to load subjects from local storage', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
      } catch (error) {
        console.error('Failed to save subjects to local storage', error);
      }
    }
  }, [subjects, isLoaded]);

  const addSubject = useCallback(
    (subject: Omit<Subject, 'id' | 'present' | 'absent'>) => {
      const newSubject: Subject = {
        ...subject,
        id: crypto.randomUUID(),
        present: 0,
        absent: 0,
      };
      setSubjects(prev => [...prev, newSubject]);
    },
    []
  );

  const updateSubject = useCallback((updatedSubject: Subject) => {
    setSubjects(prev =>
      prev.map(s => (s.id === updatedSubject.id ? updatedSubject : s))
    );
  }, []);

  const deleteSubject = useCallback((id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  }, []);

  const handlePresent = useCallback((id: string) => {
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, present: s.present + 1 } : s))
    );
  }, []);

  const handleAbsent = useCallback((id: string) => {
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, absent: s.absent + 1 } : s))
    );
  }, []);

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    handlePresent,
    handleAbsent,
    isLoaded,
  };
}
