import { Command } from './Command';
import { Querier } from './Querier';

describe('Command', () => {
  it('+compatible() should returns true', () => {
    expect(Command.prototype.compatible(new Querier())).toBe(true);
  });

  it('+relativeCommands should be undefined', () => {
    expect(Command.prototype.relativeCommands).toBeUndefined();
  });
});
