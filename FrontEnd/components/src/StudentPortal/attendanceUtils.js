// Shared attendance percentage rule, used by both Home and My Attendance so
// the two pages can never disagree:
//  - PRESENT and LATE each count as one full present day.
//  - HALF_DAY counts as half a present day.
//  - ABSENT counts as zero, but still counts in the denominator.
//  - EXCUSED, HOLIDAY, UPCOMING and NOT_RECORDED are excluded entirely —
//    excused days don't count against the student, holidays/upcoming days
//    aren't school attendance at all, and a missing record is the school's
//    gap, not the student's.
export function computeAttendance(days) {
  let presentEquivalent = 0;
  let countedDays = 0;

  days.forEach((day) => {
    switch (day.status) {
      case "PRESENT":
      case "LATE":
        presentEquivalent += 1;
        countedDays += 1;
        break;
      case "HALF_DAY":
        presentEquivalent += 0.5;
        countedDays += 1;
        break;
      case "ABSENT":
        countedDays += 1;
        break;
      default:
        break;
    }
  });

  const percentage = countedDays === 0 ? null : Math.round((presentEquivalent / countedDays) * 100);

  return {
    percentage,
    countedDays,
    present: days.filter((d) => d.status === "PRESENT").length,
    absent: days.filter((d) => d.status === "ABSENT").length,
    excused: days.filter((d) => d.status === "EXCUSED").length,
    late: days.filter((d) => d.status === "LATE").length,
    halfDay: days.filter((d) => d.status === "HALF_DAY").length,
    notRecorded: days.filter((d) => d.status === "NOT_RECORDED").length,
  };
}
