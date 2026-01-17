'use server';

/**
 * @fileOverview Calculates attendance scenarios based on a student's current status,
 * determining either how many classes can be missed or how many must be attended
 * to meet a specific percentage requirement.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateClassesMissedInputSchema = z.object({
  totalConductedClasses: z
    .number()
    .describe('The total number of classes conducted so far.'),
  attendedClasses: z
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
    const {
      totalConductedClasses: T,
      attendedClasses: A,
      attendanceRequirement,
    } = input;
    const requirement = attendanceRequirement / 100;

    if (T === 0) {
      return { status: 'info', message: 'Mark attendance to see insights.' };
    }

    const currentPercentage = A / T;

    if (currentPercentage >= requirement) {
      // CASE 1: Attendance is >= requirement.
      // Formula: m <= (A / requirement) - T
      const canMiss = Math.floor(A / requirement - T);
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
      // CASE 2: Attendance is < requirement.
      // Formula: x >= (requirement * T - A) / (1 - requirement)
      const mustAttend = Math.ceil((requirement * T - A) / (1 - requirement));
      const plural = mustAttend !== 1 ? 'es' : '';

      // Handle case where requirement is 100% and it's impossible to reach.
      if (!isFinite(mustAttend)) {
        return {
          status: 'danger',
          message: `It's no longer possible to reach ${attendanceRequirement}%.`,
        };
      }

      return {
        status: 'danger',
        message: `You need to attend the next ${mustAttend} class${plural}.`,
      };
    }
  }
);
