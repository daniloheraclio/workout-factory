export function lowerAndCapitalize(string) {
  if (!string) return string;

  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function validateEmail(email) {
  const indexOfArroba = email.trim().indexOf('@');
  const userName = email.substring(0, indexOfArroba);

  return email.replace(userName, userName.toLowerCase());
}

export function getAge(date) {
  const diff = Date.now() - new Date(date).getTime();

  const age = new Date(diff);

  return Math.abs(age.getUTCFullYear() - 1970);
}
