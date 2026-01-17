'use server';

/**
 * @fileOverview Calculates the number of classes a student can miss without falling below the minimum attendance requirement.
 *
 * - calculateClassesMissed - A function that calculates the number of missable classes.
 * - CalculateClassesMissedInput - The input type for the calculateClassesMissed function.
 * - CalculateClassesMissedOutput - The return type for the calculateClassesMissed function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateClassesMissedInputSchema = z.object({
  totalClasses: z
    .number()
    .describe('The total number of classes for the subject.'),
  presentClasses: z
    .number()
    .describe('The number of classes the student has attended.'),
  absentClasses: z
    .number()
    .describe('The number of classes the student has missed.'),
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
  classesMissable: z
    .number()
    .describe(
      'The number of future classes the student can miss without falling below the minimum attendance requirement. A negative number means the requirement is no longer reachable.'
    ),
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
      totalClasses,
      presentClasses,
      absentClasses,
      attendanceRequirement,
    } = input;

    if (totalClasses === 0) {
      return {
        classesMissable: 0,
      };
    }

    const requirement = attendanceRequirement / 100;

    // Maximum number of absences allowed over the whole semester
    const maxAbsentAllowed = Math.floor(totalClasses * (1 - requirement));

    // How many more classes can be missed from now until the end.
    // This can be negative if the user has already missed too many classes.
    const classesMissable = maxAbsentAllowed - absentClasses;

    return {
      classesMissable,
    };
  }
);
