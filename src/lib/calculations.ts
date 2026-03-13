
export interface CalculateClassesMissedInput {
  totalConductedClasses: number;
  attendedClasses: number;
  attendanceRequirement: number;
}

export interface CalculateClassesMissedOutput {
  status: 'success' | 'warning' | 'danger' | 'info';
  message: string;
}

export async function calculateClassesMissed(
  input: CalculateClassesMissedInput
): Promise<CalculateClassesMissedOutput> {
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
