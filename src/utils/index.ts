/**
 * Combines multiple class names into a single string.
 *
 * @param classes - A list of CSS class names to combine.
 * @returns A single string with all class names separated by a space.
 */
export function css(...classes: string[]) {
  return classes.join(' ');
}

/**
 * Truncates a string to a specified length and appends an ellipsis.
 * @param text - The string to truncate.
 * @param length - The maximum length of the string before truncation. Defaults to 30.
 * @returns The truncated string with '...' appended.
 */
export function ellipsize(text: string, length = 30) {
  return text.slice(0, length).concat('...');
}
