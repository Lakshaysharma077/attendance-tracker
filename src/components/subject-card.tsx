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
  BookOpen,
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
  onStatusUpdate: (
    subjectId: string,
    attendanceId: string,
    oldStatus: 'present' | 'absent'
  ) => void;
};

export function SubjectCard({
  subject,
  onUpdate,
  onDelete,
  onPresent,
  onAbsent,
  onStatusUpdate,
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
      progressColor = 'bg-primary';
    } else if (percentage >= requirement - 5) {
      status = 'borderline';
      progressColor = 'bg-yellow-500';
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
      <Card className="bg-white hover:border-slate-300 transition-colors h-full flex flex-col overflow-hidden relative border-slate-200 shadow-sm">
        <CardHeader className="flex-row items-start justify-between pb-2 space-y-0">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight text-slate-900">
              {subject.name}
            </CardTitle>
            {subject.teacher && (
              <CardDescription className="flex items-center pt-0.5 text-slate-500 font-medium text-xs">
                <User className="mr-1 h-3 w-3" />
                {subject.teacher}
              </CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md hover:bg-slate-100 transition-colors">
                <MoreVertical className="h-4 w-4 text-slate-400" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg shadow-md border-slate-200 p-1">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="rounded-md cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive rounded-md cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-grow space-y-5 pt-2">
          <div className="text-left">
            <p
              className={cn(
                'text-4xl font-bold tracking-tight',
                {
                  'text-slate-900': status === 'safe',
                  'text-yellow-600': status === 'borderline',
                  'text-destructive': status === 'danger',
                }
              )}
            >
              {percentage.toFixed(0)}
              <span className="text-xl ml-0.5 font-medium">%</span>
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              {subject.present} OF {total} ATTENDED
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn('h-full transition-all duration-500 ease-out rounded-full', progressColor)} 
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              <span>Goal: {subject.requirement}%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => onAbsent(subject.id)}
              className="h-10 rounded-lg border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors text-xs font-bold uppercase"
            >
              Absent
            </Button>
            <Button
              onClick={() => onPresent(subject.id)}
              className="h-10 rounded-lg transition-colors text-xs font-bold uppercase bg-slate-900 hover:bg-slate-800 text-white"
            >
              Present
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-3 pt-4 border-t border-slate-50">
          <MissableClassesInfo subject={subject} />
          <div className="flex w-full items-center justify-between">
            {subject.lastUpdated ? (
              <p className="text-[10px] font-medium text-slate-400 italic">
                Last updated {formatDistanceToNow(new Date(subject.lastUpdated), {
                  addSuffix: true,
                })}
              </p>
            ) : (
              <div />
            )}
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-[10px] font-bold text-primary hover:text-primary-foreground/80 transition-colors uppercase tracking-wider"
              onClick={() => setIsReportDialogOpen(true)}
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Detailed Report
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
        onUpdateAttendanceStatus={onStatusUpdate}
      />
    </>
  );
}
