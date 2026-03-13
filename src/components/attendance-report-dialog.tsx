'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, AlertTriangle } from 'lucide-react';
import { useUser } from '@/firebase';
import { useAttendanceHistory } from '@/hooks/use-attendance-history';
import type { Subject, AttendanceRecord } from '@/lib/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

type AttendanceReportDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  subject: Subject;
  onUpdateAttendanceStatus: (
    subjectId: string,
    attendanceId: string,
    oldStatus: 'present' | 'absent'
  ) => void;
};

type ConfirmationState = {
  isOpen: boolean;
  record: AttendanceRecord | null;
};

export function AttendanceReportDialog({
  isOpen,
  setIsOpen,
  subject,
  onUpdateAttendanceStatus,
}: AttendanceReportDialogProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const { records, isLoading } = useAttendanceHistory(user?.uid, subject.id);
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    record: null,
  });

  const handleUpdateClick = (record: AttendanceRecord) => {
    setConfirmation({ isOpen: true, record: record });
  };

  const handleConfirmUpdate = () => {
    if (confirmation.record) {
      onUpdateAttendanceStatus(
        subject.id,
        confirmation.record.id,
        confirmation.record.status
      );
      toast({
        title: 'Attendance Updated',
        description: 'The record has been successfully changed.',
      });
    }
    setConfirmation({ isOpen: false, record: null });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline">
              Attendance Report
            </DialogTitle>
            <DialogDescription>
              Showing history for "{subject.name}". You can edit entries here.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72">
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : records.length > 0 ? (
                  records.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {format(new Date(record.date), 'PPp')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === 'present'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {record.status.charAt(0).toUpperCase() +
                            record.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleUpdateClick(record)}
                            >
                              Mark as{' '}
                              {record.status === 'present'
                                ? 'Absent'
                                : 'Present'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No attendance records yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={confirmation.isOpen}
        onOpenChange={open => setConfirmation({ ...confirmation, isOpen: open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
              Confirm Change
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this entry from{' '}
              <strong>{confirmation.record?.status}</strong> to{' '}
              <strong>
                {confirmation.record?.status === 'present'
                  ? 'absent'
                  : 'present'}
              </strong>
              ? This will affect your overall attendance percentage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setConfirmation({ isOpen: false, record: null })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUpdate}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
