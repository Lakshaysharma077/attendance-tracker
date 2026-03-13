'use client';

import { useState, useEffect } from 'react';
import { calculateClassesMissed } from '@/lib/calculations';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Subject } from '@/lib/types';

type Props = {
  subject: Subject;
};

export function MissableClassesInfo({ subject }: Props) {
  const [result, setResult] = useState<{
    message: string;
    type: 'info' | 'success' | 'warning' | 'danger';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const totalConductedClasses = subject.present + subject.absent;
  const {
    present: attendedClasses,
    requirement: attendanceRequirement,
  } = subject;

  useEffect(() => {
    async function getInfo() {
      setIsLoading(true);
      try {
        const output = await calculateClassesMissed({
          totalConductedClasses,
          attendedClasses,
          attendanceRequirement,
        });

        setResult({ message: output.message, type: output.status });
      } catch (error) {
        console.error('AI calculation failed:', error);
        setResult({
          message: 'Could not calculate insights.',
          type: 'warning',
        });
      } finally {
        setIsLoading(false);
      }
    }
    getInfo();
  }, [totalConductedClasses, attendedClasses, attendanceRequirement]);

  if (isLoading) {
    return <Skeleton className="h-6 w-3/4" />;
  }

  if (!result) return null;

  const Icon =
    result.type === 'success'
      ? CheckCircle
      : result.type === 'warning' || result.type === 'danger'
      ? AlertCircle
      : Info;
  const colorClass = cn({
    'text-slate-600': result.type === 'success' || result.type === 'info',
    'text-yellow-600': result.type === 'warning',
    'text-destructive': result.type === 'danger',
  });

  return (
    <div className={cn('flex items-center text-[10px] uppercase tracking-wider', colorClass)}>
      <Icon className="mr-1.5 h-3 w-3 shrink-0" />
      <span className="font-bold">{result.message}</span>
    </div>
  );
}
