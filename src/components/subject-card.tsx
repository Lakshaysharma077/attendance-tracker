'use client';

import { useState, useMemo } from 'react';
import type { Subject } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EditSubjectDialog } from './edit-subject-dialog';
import { MissableClassesInfo } from './missable-classes-info';
import {
  MoreVertical,
  User,
  TrendingUp,
  Minus,
  Plus,
  Edit,
  Trash2,
  FileText,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { AttendanceReportDialog } from './attendance-report-dialog';

type SubjectCardProps = {
  subject: Subject;
  onUpdate: (subject: Subject) => void;
  onDelete: (id: string) => void;
  onPresent: (id: string) => void;
  onAbsent: (id: string) => void;
};

export function SubjectCard({
  subject,
  onUpdate,
  onDelete,
  onPresent,
  onAbsent,
}: SubjectCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const { toast } = useToast();

  const { total, percentage, status, progressColor } = useMemo(() => {
    const total = subject.present + subject.absent;
    const percentage = total > 0 ? (subject.present / total) * 100 : 0;
    const requirement = subject.requirement;

    let status: 'safe' | 'borderline' | 'danger' = 'danger';
    let progressColor = 'bg-destructive';

    if (percentage >= requirement) {
      status = 'safe';
      progressColor = 'bg-primary'; // Original was chart-2
    } else if (percentage >= requirement - 5) {
      status = 'borderline';
      progressColor = 'bg-yellow-500'; // Original was chart-4
    }
    return { total, percentage, status, progressColor };
  }, [subject]);

  const handleDelete = () => {
    onDelete(subject.id);
    toast({
      title: 'Subject Deleted',
      description: `"${subject.name}" has been removed.`,
    });
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle className="text-xl">
              {subject.name}
            </CardTitle>
            {subject.teacher && (
              <CardDescription className="flex items-center pt-1">
                <User className="mr-1.5 h-3 w-3" />
                {subject.teacher}
              </CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-grow space-y-6">
          <div className="text-center">
            <p
              className={cn(
                'text-5xl font-bold',
                {
                  'text-primary': status === 'safe', // original was chart-2
                  'text-yellow-500': status === 'borderline', // original was chart-4
                  'text-destructive': status === 'danger',
                }
              )}
            >
              {percentage.toFixed(1)}
              <span className="text-3xl">%</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {subject.present} present out of {total} classes
            </p>
          </div>
          <div className="space-y-2">
            <Progress
              value={percentage}
              className={cn('h-2', progressColor)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <div className="flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>{subject.requirement}% required</span>
              </div>
              <span>100%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => onAbsent(subject.id)}
            >
              <Minus className="mr-2 h-4 w-4" /> Absent
            </Button>
            <Button
              onClick={() => onPresent(subject.id)}
            >
              <Plus className="mr-2 h-4 w-4" /> Present
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2">
          <MissableClassesInfo subject={subject} />
          <div className="flex w-full items-center justify-between">
            {subject.lastUpdated ? (
              <p className="text-xs text-muted-foreground">
                Last updated{' '}
                {formatDistanceToNow(new Date(subject.lastUpdated), {
                  addSuffix: true,
                })}
              </p>
            ) : (
              <div /> // Placeholder for spacing
            )}
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => setIsReportDialogOpen(true)}
            >
              <FileText className="mr-1 h-3 w-3" />
              View Report
            </Button>
          </div>
        </CardFooter>
      </Card>
      <EditSubjectDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        subject={subject}
        onUpdateSubject={onUpdate}
      />
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the subject "{subject.name}" and all
              its attendance data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AttendanceReportDialog
        isOpen={isReportDialogOpen}
        setIsOpen={setIsReportDialogOpen}
        subject={subject}
      />
    </>
  );
}
