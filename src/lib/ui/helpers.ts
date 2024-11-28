import {StyleSheet} from 'react-native';

export const flatten = StyleSheet.flatten;

export function hexWithOpacity(hexColor: string, opacity: number): string {
  // Ensure the hex color starts with '#'
  if (!hexColor) return 'red';

  if (hexColor[0] !== '#') {
    throw new Error("Invalid hex color format. It should start with '#'.");
  }

  // Remove the hash (#) if present
  let hex = hexColor.slice(1);

  // If the hex is in shorthand form (e.g., #abc), expand it to full form (e.g., #aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  // Check if the hex code is valid
  if (hex.length !== 6) {
    throw new Error(
      'Invalid hex color length. It should be 6 characters long.',
    );
  }

  // Clamp opacity value between 0 and 1
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity should be between 0 and 1.');
  }

  // Convert opacity to a 2-digit hex value
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');

  // Return the hex color with opacity
  return `#${hex}${alpha}`;
}

export function darkenColor(hexColor: string, amount = 70) {
  // Remove the hash at the start if it's there
  hexColor = hexColor.replace(/^#/, '');

  // Parse r, g, b values
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  // Adjust the values by reducing brightness
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);

  // Convert back to hexadecimal and return the darker color
  const darkenedColor =
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');

  return darkenedColor;
}
