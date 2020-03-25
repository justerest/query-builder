import { Command } from './Command';

describe('Command', () => {
  it('+compatible() should returns true', () => {
    expect(Command.prototype.compatible([])).toBe(true);
  });

  it('+relativeCommands() should returns true', () => {
    expect(Command.prototype.relativeCommands()).toEqual([]);
  });
});
