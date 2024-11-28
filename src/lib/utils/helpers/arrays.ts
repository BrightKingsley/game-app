export function moveStringToEnd<T>(arr: T[], str: T): T[] {
  const index = arr.indexOf(str);

  if (index !== -1) {
    // If the string exists, remove it from the array
    arr.splice(index, 1);
  }

  // Add the string to the end of the array
  return [...arr, str];
}
