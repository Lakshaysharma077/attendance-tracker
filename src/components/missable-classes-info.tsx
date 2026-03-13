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
    'text-chart-2': result.type === 'success',
    'text-chart-4': result.type === 'warning',
    'text-destructive': result.type === 'danger',
    'text-muted-foreground': result.type === 'info',
  });

  return (
    <div className={cn('flex items-center text-sm', colorClass)}>
      <Icon className="mr-2 h-4 w-4 shrink-0" />
      <span className="font-medium">{result.message}</span>
    </div>
  );
}
