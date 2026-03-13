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
    let progressColor = 'bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)]';

    if (percentage >= requirement) {
      status = 'safe';
      progressColor = 'bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]';
    } else if (percentage >= requirement - 5) {
      status = 'borderline';
      progressColor = 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]';
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
      <Card className="glass-3d rounded-[2.5rem] border-white/40 overflow-hidden relative preserve-3d">
        <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
          <BookOpen className="h-24 w-24 -mr-8 -mt-8 rotate-12" />
        </div>
        <CardHeader className="flex-row items-start justify-between pb-2">
          <div className="translate-z-10">
            <CardTitle className="text-2xl font-black tracking-tight text-foreground">
              {subject.name}
            </CardTitle>
            {subject.teacher && (
              <CardDescription className="flex items-center pt-1 font-medium italic">
                <User className="mr-1.5 h-3 w-3" />
                {subject.teacher}
              </CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-xl hover:bg-white/20 transition-colors">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-3d border-white/20 rounded-2xl">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="rounded-xl">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive rounded-xl"
              >
                < Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-grow space-y-8 pt-4 translate-z-20">
          <div className="text-center relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 -z-10 animate-pulse" />
            <p
              className={cn(
                'text-6xl font-black tracking-tighter drop-shadow-2xl',
                {
                  'text-primary': status === 'safe',
                  'text-yellow-600': status === 'borderline',
                  'text-destructive': status === 'danger',
                }
              )}
            >
              {percentage.toFixed(0)}
              <span className="text-3xl ml-0.5">%</span>
            </p>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
              {subject.present} / {total} Lectures
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-3 w-full bg-slate-200/50 rounded-full overflow-hidden border border-white/20">
              <div 
                className={cn('h-full transition-all duration-1000 ease-out rounded-full', progressColor)} 
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-black text-muted-foreground/60 uppercase tracking-tighter">
              <span>0%</span>
              <div className="flex items-center bg-white/30 px-2 py-0.5 rounded-full border border-white/40">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>Goal: {subject.requirement}%</span>
              </div>
              <span>100%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => onAbsent(subject.id)}
              className="h-14 rounded-2xl glass-3d border-white/40 hover:bg-destructive/10 text-destructive font-bold transition-all active:scale-95 shadow-lg"
            >
              <Minus className="mr-2 h-5 w-5" /> Absent
            </Button>
            <Button
              onClick={() => onPresent(subject.id)}
              className="h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-3d-primary hover:scale-[1.02] transition-all active:scale-95 border-t border-white/20"
            >
              <Plus className="mr-2 h-5 w-5" /> Present
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4 pt-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <MissableClassesInfo subject={subject} />
          <div className="flex w-full items-center justify-between">
            {subject.lastUpdated ? (
              <p className="text-[10px] font-bold text-muted-foreground italic">
                ⏱ {formatDistanceToNow(new Date(subject.lastUpdated), {
                  addSuffix: true,
                })}
              </p>
            ) : (
              <div />
            )}
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-[10px] font-black uppercase tracking-tighter hover:text-primary transition-colors"
              onClick={() => setIsReportDialogOpen(true)}
            >
              <FileText className="mr-1 h-3 w-3" />
              Full History
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
        onUpdateAttendanceStatus={onUpdateAttendanceStatus}
      />
    </>
  );
}
