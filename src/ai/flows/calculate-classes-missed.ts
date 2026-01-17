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
      'The number of classes the student can miss without falling below the minimum attendance requirement.'
    ),
  classesNeededToAttend: z
    .number()
    .describe(
      'The number of classes the student needs to attend to reach the minimum attendance requirement if they are below it.'
    ),
  isBelowRequirement: z
    .boolean()
    .describe(
      'Whether the student is below the attendance requirement already, based on presentClasses, totalClasses, and attendanceRequirement.'
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
        classesNeededToAttend: 0,
        isBelowRequirement: false,
      };
    }

    const requirement = attendanceRequirement / 100;
    const conductedClasses = presentClasses + absentClasses;

    // Attendance based on classes conducted so far
    const currentAttendance =
      conductedClasses > 0 ? (presentClasses / conductedClasses) * 100 : 100;
    const isBelowRequirement = currentAttendance < attendanceRequirement;

    // Max classes that can be missed throughout the semester
    const maxAbsentAllowed = Math.floor(totalClasses * (1 - requirement));

    // Classes that can still be missed
    const classesMissable = maxAbsentAllowed - absentClasses;

    let classesNeededToAttend = 0;
    if (isBelowRequirement) {
      // Minimum classes needed to be present for the whole semester
      const minPresentNeeded = Math.ceil(totalClasses * requirement);
      classesNeededToAttend = minPresentNeeded - presentClasses;
    }

    return {
      classesMissable: classesMissable >= 0 ? classesMissable : 0,
      classesNeededToAttend:
        classesNeededToAttend > 0 ? classesNeededToAttend : 0,
      isBelowRequirement,
    };
  }
);
