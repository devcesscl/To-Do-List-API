import { fizzBuzz } from './fizzbuzz';

// Kata FizzBuzz - TDD iterativo
// Iteración 1: múltiplos de 3 -> 'Fizz'
// Iteración 2: múltiplos de 5 -> 'Buzz'
// Iteración 3: múltiplos de 15 -> 'FizzBuzz'
// Iteración 4: cualquier otro -> el número como string

describe('Kata FizzBuzz', () => {
  it('should return "Fizz" for multiples of 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
    expect(fizzBuzz(9)).toBe('Fizz');
  });

  it('should return "Buzz" for multiples of 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
    expect(fizzBuzz(10)).toBe('Buzz');
  });

  it('should return "FizzBuzz" for multiples of 15', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
    expect(fizzBuzz(30)).toBe('FizzBuzz');
  });

  it('should return the number as string for other values', () => {
    expect(fizzBuzz(1)).toBe('1');
    expect(fizzBuzz(7)).toBe('7');
  });
});
