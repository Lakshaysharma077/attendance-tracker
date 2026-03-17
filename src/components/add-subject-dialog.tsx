'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
});

type AddSubjectDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddSubject: (
    subject: Omit<Subject, 'id' | 'present' | 'absent'>
  ) => void;
};

export function AddSubjectDialog({
  isOpen,
  setIsOpen,
  onAddSubject,
}: AddSubjectDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      teacher: '',
      totalClasses: 40,
      requirement: 75,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsOpen(false);
      
      setTimeout(async () => {
        await onAddSubject({
          name: values.name,
          teacher: values.teacher || '',
          requirement: values.requirement,
          totalClasses: values.totalClasses,
        });
        form.reset();
      }, 50);
    } catch (error) {
       console.error("Failed to add subject:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Fill in the details for your new subject.
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
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Adding...' : 'Add Subject'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
