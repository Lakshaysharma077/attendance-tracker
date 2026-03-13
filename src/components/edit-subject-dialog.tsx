'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Subject } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Subject name cannot be empty.' }),
  teacher: z.string().optional(),
  totalClasses: z.coerce.number().min(1, { message: 'Must be at least 1.' }),
  requirement: z.coerce
    .number({ invalid_type_error: 'Must be a number.' })
    .min(1, { message: 'Must be at least 1.' })
    .max(100, { message: 'Cannot exceed 100.' }),
  present: z.coerce.number().min(0, { message: 'Cannot be negative.' }),
  absent: z.coerce.number().min(0, { message: 'Cannot be negative.' }),
});

type EditSubjectDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  subject: Subject;
  onUpdateSubject: (subject: Subject) => void;
};

export function EditSubjectDialog({
  isOpen,
  setIsOpen,
  subject,
  onUpdateSubject,
}: EditSubjectDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: subject.name,
      teacher: subject.teacher,
      totalClasses: subject.totalClasses,
      requirement: subject.requirement,
      present: subject.present,
      absent: subject.absent,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: subject.name,
        teacher: subject.teacher,
        totalClasses: subject.totalClasses,
        requirement: subject.requirement,
        present: subject.present,
        absent: subject.absent,
      });
    }
  }, [isOpen, subject, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdateSubject({
      ...subject,
      ...values,
      teacher: values.teacher || '',
    });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Edit Subject</DialogTitle>
          <DialogDescription>
            Update the details for your subject.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Applied Physics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Prof. Sharma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalClasses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Classes</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance Requirement (%)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="present"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classes Attended</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="absent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classes Missed</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
