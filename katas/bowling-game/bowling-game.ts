export class BowlingGame {
  private rolls: number[] = [];

  roll(pins: number): void {
    this.rolls.push(pins);
  }

  score(): number {
    let total = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        total += 10 + this.strikeBonus(rollIndex);
        rollIndex += 1;
      } else if (this.isSpare(rollIndex)) {
        total += 10 + this.spareBonus(rollIndex);
        rollIndex += 2;
      } else {
        total += this.frameScore(rollIndex);
        rollIndex += 2;
      }
    }

    return total;
  }

  private isStrike(index: number): boolean {
    return this.rolls[index] === 10;
  }

  private isSpare(index: number): boolean {
    return this.rolls[index] + this.rolls[index + 1] === 10;
  }

  private strikeBonus(index: number): number {
    return this.rolls[index + 1] + this.rolls[index + 2];
  }

  private spareBonus(index: number): number {
    return this.rolls[index + 2];
  }

  private frameScore(index: number): number {
    return this.rolls[index] + this.rolls[index + 1];
  }
}
