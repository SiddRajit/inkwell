
export function getInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2) // max 2 words
    .map((word) => word[0].toUpperCase())
    .join("")
}

