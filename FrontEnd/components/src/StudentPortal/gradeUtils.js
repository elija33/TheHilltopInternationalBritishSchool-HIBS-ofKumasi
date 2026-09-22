// Term mark is a weighted average of scored assessments only. ABSENT counts
// as zero (an unexcused miss still costs marks) but NOT_ASSESSED assessments
// are excluded entirely from both the weight total and the average — the
// mark reflects only what the student actually sat, per the "not assessed"
// rule in the spec.
export function computeTermMark(assessments) {
  const counted = assessments.filter((a) => a.status !== "NOT_ASSESSED");
  const totalWeight = counted.reduce((sum, a) => sum + a.weight, 0);
  if (totalWeight === 0) return null;

  const weightedSum = counted.reduce((sum, a) => {
    const pct = a.status === "ABSENT" ? 0 : (a.value / a.max) * 100;
    return sum + pct * a.weight;
  }, 0);

  return Math.round(weightedSum / totalWeight);
}
