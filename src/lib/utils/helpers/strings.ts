type MatchResult = {
  matchedText: string;
  remainingText: string;
};

export function matchAndCutText(
  input: string,
  text: string,
): MatchResult | null {
  const textCopy = text;
  const inputCopy = input;

  if (textCopy.toLowerCase().startsWith(inputCopy.toLowerCase())) {
    return {
      matchedText: text.slice(0, input.length),
      remainingText: text.slice(input.length),
    };
  }
  return null;
}
