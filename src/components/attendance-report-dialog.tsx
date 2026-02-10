'use client';

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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase/auth/use-user';
import { useAttendanceHistory } from '@/hooks/use-attendance-history';
import type { Subject } from '@/lib/types';
import { format } from 'date-fns';

type AttendanceReportDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  subject: Subject;
};

export function AttendanceReportDialog({
  isOpen,
  setIsOpen,
  subject,
}: AttendanceReportDialogProps) {
  const { user } = useUser();
  const { records, isLoading } = useAttendanceHistory(user?.uid, subject.id);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Attendance Report</DialogTitle>
          <DialogDescription>
            Showing history for "{subject.name}".
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                  </TableRow>
                ))
              ) : records.length > 0 ? (
                records.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {format(new Date(record.date), 'PPp')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          record.status === 'present'
                            ? 'default'
                            : 'destructive'
                        }
                        className={
                          record.status === 'present'
                            ? 'border-transparent bg-chart-2 text-primary-foreground hover:bg-chart-2/80'
                            : ''
                        }
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    No attendance records yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
