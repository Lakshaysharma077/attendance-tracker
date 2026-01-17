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
  totalClasses: z.number().describe('The total number of classes for the subject.'),
  presentClasses: z.number().describe('The number of classes the student has attended.'),
  attendanceRequirement: z
    .number()
    .min(1)
    .max(100)
    .describe('The minimum attendance requirement (percentage).'),
});
export type CalculateClassesMissedInput = z.infer<typeof CalculateClassesMissedInputSchema>;

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
export type CalculateClassesMissedOutput = z.infer<typeof CalculateClassesMissedOutputSchema>;

export async function calculateClassesMissed(
  input: CalculateClassesMissedInput
): Promise<CalculateClassesMissedOutput> {
  return calculateClassesMissedFlow(input);
}

const calculateClassesMissedPrompt = ai.definePrompt({
  name: 'calculateClassesMissedPrompt',
  input: {schema: CalculateClassesMissedInputSchema},
  output: {schema: CalculateClassesMissedOutputSchema},
  prompt: `You are a helpful assistant for college students to keep track of attendance.

You will receive the total number of classes, the number of classes the student has attended, and the minimum attendance requirement for a subject.

Calculate how many classes the student can miss without falling below the minimum attendance requirement. Also calculate how many classes the student needs to attend to reach the minimum attendance requirement if they are below it. Return a warning if the student is already below the requirement.

Total Classes: {{{totalClasses}}}
Present Classes: {{{presentClasses}}}
Attendance Requirement: {{{attendanceRequirement}}}%

Consider the following:
- The number of classes that the student can miss should be a non-negative integer.
- If the student is already below the minimum attendance requirement, the number of classes that they can miss should be 0.
- If the student is already below the minimum attendance requirement, calculate how many classes the student needs to attend to reach the requirement. The result should be a non-negative integer.


JSON Output:`, // No Handlebars in JSON
});

const calculateClassesMissedFlow = ai.defineFlow(
  {
    name: 'calculateClassesMissedFlow',
    inputSchema: CalculateClassesMissedInputSchema,
    outputSchema: CalculateClassesMissedOutputSchema,
  },
  async input => {
    const attendancePercentage = (input.presentClasses / input.totalClasses) * 100;
    const isBelowRequirement = attendancePercentage < input.attendanceRequirement;
    let classesMissable = 0;
    let classesNeededToAttend = 0;

    if (!isBelowRequirement) {
      // Calculate max classes missable
      for (let i = 0; i <= input.totalClasses - input.presentClasses; i++) {
        const futureTotalClasses = input.totalClasses;
        const futurePresentClasses = input.presentClasses;

        if (
          (futurePresentClasses / futureTotalClasses) * 100 >= input.attendanceRequirement &&
          (futurePresentClasses - i >= 0) &&
          ((futurePresentClasses - i) / futureTotalClasses) * 100 >= input.attendanceRequirement
        ) {
          classesMissable = i;
        }
      }
    } else {
      // Calculate min classes needed to attend
      for (let i = 0; i <= input.totalClasses - input.presentClasses; i++) {
        const futureTotalClasses = input.totalClasses;
        const futurePresentClasses = input.presentClasses + i;

        if (
          (futurePresentClasses / futureTotalClasses) * 100 >= input.attendanceRequirement &&
          (futurePresentClasses >= 0) &&
          (futurePresentClasses / futureTotalClasses) * 100 >= input.attendanceRequirement
        ) {
          classesNeededToAttend = i;
          break;
        }
      }
    }

    return {
      classesMissable: classesMissable,
      classesNeededToAttend: classesNeededToAttend,
      isBelowRequirement: isBelowRequirement,
    };
  }
);
