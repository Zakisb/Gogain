export default function calculateAge(birthDate: Date | null) {
  if (!birthDate) {
    return new Date();
  }
  const dob = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  // If the birthday hasn't occurred this year yet, subtract 1 from the age.
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}
