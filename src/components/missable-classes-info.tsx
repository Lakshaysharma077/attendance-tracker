'use client';

import { useState, useEffect } from 'react';
import { calculateClassesMissed } from '@/ai/flows/calculate-classes-missed';
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
    type: 'info' | 'success' | 'warning';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    totalClasses,
    present: presentClasses,
    absent: absentClasses,
    requirement: attendanceRequirement,
  } = subject;

  useEffect(() => {
    async function getInfo() {
      if (presentClasses + absentClasses === 0) {
        setResult({
          message: 'Mark attendance to see insights.',
          type: 'info',
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const output = await calculateClassesMissed({
          totalClasses,
          presentClasses,
          absentClasses,
          attendanceRequirement,
        });

        const { classesMissable } = output;

        if (classesMissable < 0) {
          setResult({
            message: `Attendance requirement is no longer reachable.`,
            type: 'warning',
          });
        } else if (classesMissable === 0) {
          setResult({
            message: `You cannot miss any more classes to be safe.`,
            type: 'warning',
          });
        } else {
          setResult({
            message: `You can miss ${classesMissable} more class(es).`,
            type: classesMissable <= 2 ? 'warning' : 'success',
          });
        }
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
  }, [
    totalClasses,
    presentClasses,
    absentClasses,
    attendanceRequirement,
  ]);

  if (isLoading) {
    return <Skeleton className="h-6 w-3/4" />;
  }

  if (!result) return null;

  const Icon =
    result.type === 'success'
      ? CheckCircle
      : result.type === 'warning'
      ? AlertCircle
      : Info;
  const colorClass = cn({
    'text-chart-2': result.type === 'success',
    'text-chart-4': result.type === 'warning',
    'text-muted-foreground': result.type === 'info',
  });

  return (
    <div className={cn('flex items-center text-sm', colorClass)}>
      <Icon className="mr-2 h-4 w-4 shrink-0" />
      <span className="font-medium">{result.message}</span>
    </div>
  );
}
