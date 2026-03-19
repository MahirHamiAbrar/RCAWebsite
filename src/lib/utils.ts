// Get initials from name with smart handling
export function getInitials(name: string): string {
  if (!name || name.trim().length === 0) return "NA";

  const trimmedName = name.trim();
  const words = trimmedName.split(/\s+/);

  // Check if first word is "MD" (with or without dots)
  let startIndex = 0;
  if (words.length > 1) {
    const firstWord = words[0].toLowerCase().replace(/\./g, "");
    if (firstWord === "md") {
      startIndex = 1;
    }
  }

  const wordsToProcess = words.slice(startIndex);

  if (wordsToProcess.length === 0) return "NA";

  // If multiple words, take first letter of each (max 3)
  if (wordsToProcess.length > 1) {
    return wordsToProcess
      .slice(0, 3)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }

  // If single word, take first two letters
  return wordsToProcess[0].substring(0, 2).toUpperCase();
}
