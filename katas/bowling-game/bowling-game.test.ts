import { BowlingGame } from './bowling-game';

function rollMany(game: BowlingGame, times: number, pins: number) {
  for (let i = 0; i < times; i++) game.roll(pins);
}

function rollSpare(game: BowlingGame) {
  game.roll(5);
  game.roll(5);
}

function rollStrike(game: BowlingGame) {
  game.roll(10);
}

describe('Kata Bowling Game', () => {
  let game: BowlingGame;

  beforeEach(() => { game = new BowlingGame(); });

  it('should score 0 for gutter game', () => {
    rollMany(game, 20, 0);
    expect(game.score()).toBe(0);
  });

  it('should score 20 for all ones', () => {
    rollMany(game, 20, 1);
    expect(game.score()).toBe(20);
  });

  it('should add next roll bonus for spare', () => {
    rollSpare(game);
    game.roll(3);
    rollMany(game, 17, 0);
    expect(game.score()).toBe(16);
  });

  it('should add next two rolls bonus for strike', () => {
    rollStrike(game);
    game.roll(3);
    game.roll(4);
    rollMany(game, 16, 0);
    expect(game.score()).toBe(24);
  });

  it('should score 300 for perfect game', () => {
    rollMany(game, 12, 10);
    expect(game.score()).toBe(300);
  });
});
