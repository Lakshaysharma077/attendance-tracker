'use server';

/**
 * @fileOverview Calculates attendance scenarios based on a student's current status,
 * determining either how many classes can be missed or how many must be attended
 * to meet a specific percentage requirement.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateClassesMissedInputSchema = z.object({
  totalClasses: z
    .number()
    .describe('The total number of classes conducted so far.'),
  presentClasses: z
    .number()
    .describe('The number of classes the student has attended.'),
  attendanceRequirement: z
    .number()
    .min(1)
    .max(100)
    .describe('The minimum attendance requirement (percentage).'),
});
export type CalculateClassesMissedInput = z.infer<
  typeof CalculateClassesMissedInputSchema
>;

const CalculateClassesMissedOutputSchema = z.object({
  status: z.enum(['success', 'warning', 'danger', 'info']),
  message: z.string(),
});
export type CalculateClassesMissedOutput = z.infer<
  typeof CalculateClassesMissedOutputSchema
>;

export async function calculateClassesMissed(
  input: CalculateClassesMissedInput
): Promise<CalculateClassesMissedOutput> {
  return calculateClassesMissedFlow(input);
}

const calculateClassesMissedFlow = ai.defineFlow(
  {
    name: 'calculateClassesMissedFlow',
    inputSchema: CalculateClassesMissedInputSchema,
    outputSchema: CalculateClassesMissedOutputSchema,
  },
  async input => {
    const { totalClasses, presentClasses, attendanceRequirement } = input;
    const requirement = attendanceRequirement / 100;

    if (totalClasses === 0) {
      return { status: 'info', message: 'Mark attendance to see insights.' };
    }

    const currentPercentage = presentClasses / totalClasses;

    if (currentPercentage >= requirement) {
      // CASE 1: Attendance is >= requirement. Calculate how many classes can be missed.
      const canMiss = Math.floor(presentClasses / requirement - totalClasses);
      const plural = canMiss !== 1 ? 'es' : '';

      if (canMiss > 0) {
        return {
          status: canMiss <= 2 ? 'warning' : 'success',
          message: `You can miss ${canMiss} more class${plural}.`,
        };
      } else {
        return {
          status: 'warning',
          message: 'You cannot miss any more classes to be safe.',
        };
      }
    } else {
      // CASE 2: Attendance is < requirement. Calculate how many classes must be attended.
      const mustAttend = Math.ceil(
        (requirement * totalClasses - presentClasses) / (1 - requirement)
      );
      const plural = mustAttend !== 1 ? 'es' : '';

      if (mustAttend > 0) {
        return {
          status: 'danger',
          message: `You need to attend the next ${mustAttend} class${plural}.`,
        };
      } else {
        // Fallback for floating point issues near the threshold
        return {
          status: 'danger',
          message: `You need to attend the next class to reach ${attendanceRequirement}%.`,
        };
      }
    }
  }
);
