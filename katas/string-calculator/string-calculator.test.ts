import { add } from './string-calculator';

describe('Kata String Calculator', () => {
  // Iteración 1: cadena vacía -> 0
  it('should return 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  // Iteración 2: un número
  it('should return the number for single input', () => {
    expect(add('5')).toBe(5);
  });

  // Iteración 3: dos números separados por coma
  it('should return sum of two numbers', () => {
    expect(add('1,2')).toBe(3);
  });

  // Iteración 4: N números
  it('should return sum of multiple numbers', () => {
    expect(add('1,2,3,4,5')).toBe(15);
  });

  // Iteración 5: saltos de línea como delimitador
  it('should handle newlines as delimiter', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  // Iteración 6: delimitador personalizado
  it('should support custom delimiter', () => {
    expect(add('//;\n1;2;3')).toBe(6);
  });

  // Iteración 7: negativos -> error con descripción
  it('should throw error for negative numbers', () => {
    expect(() => add('1,-2,3,-4')).toThrow('Negatives not allowed: -2, -4');
  });
});
