// Kata String Calculator - Roy Osherove
// 7 iteraciones TDD

export function add(input: string): number {
  if (input === '') return 0;

  let delimiter = /,|\n/;
  let numbers = input;

  // Iteración 6: delimitador personalizado //[delim]\n
  if (input.startsWith('//')) {
    const match = input.match(/^\/\/(.+)\n([\s\S]*)$/);
    if (match) {
      const delim = match[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      delimiter = new RegExp(delim);
      numbers = match[2];
    }
  }

  const parts = numbers.split(delimiter).map(Number);

  // Iteración 7: negativos no permitidos
  const negatives = parts.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  return parts.reduce((sum, n) => sum + n, 0);
}
