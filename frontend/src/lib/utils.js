/**
 * Utility to conditionally join classNames.
 * Works well with Tailwind CSS and Radix UI.
 */
export function cn(...inputs) {
  return inputs
    .flat(Infinity) // flatten any nested arrays
    .filter(Boolean) // remove falsy values (false, null, undefined, '')
    .join(' ')
}
