export default function calculateTrainingDate(
  startDate: Date,
  dayOffset: number
) {
  const trainingDate = new Date(startDate);
  trainingDate.setDate(startDate.getDate() + dayOffset);
  return trainingDate;
}
