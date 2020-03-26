import { Command } from './Command';
import { GroupByCommand } from './commands/groupBy/GroupByCommand';
import { SelectCommand } from './commands/SelectCommand';
import { Field } from './Field';
import { Querier } from './Querier';

describe('Querier', () => {
  let querier: Querier;

  beforeEach(() => {
    querier = new Querier();
  });

  it('should be created', () => {
    expect(querier).toBeInstanceOf(Querier);
  });

  it('+getCommands() should returns Command[]', () => {
    expect(querier.getCommands()).toEqual([]);
  });

  it('+addCommand() should add command', () => {
    const command = {} as Command;
    querier.addCommand(command);
    expect(querier.getCommands()).toEqual([command]);
  });

  it('+addCommand() should skip addition of existing command', () => {
    querier.addCommand({ id: '1', isMatch: (command) => command.id === '1' } as Command);
    querier.addCommand({ id: '1', isMatch: (command) => command.id === '1' } as Command);
    expect(querier.getCommands()).toHaveLength(1);
  });

  it('+addCommand() should add relative commands', () => {
    querier.addCommand(new SelectCommand(new Field('', '')));
    expect(querier.getCommands()).toHaveLength(2);
  });

  it('+removeCommand() should remove command', () => {
    querier.addCommand({ id: '1', isMatch: (command) => command.id === '1' } as Command);
    expect(querier.getCommands()).toHaveLength(1);
    querier.removeCommand({ id: '1' } as Command);
    expect(querier.getCommands()).toHaveLength(0);
  });

  it('+removeCommand() should skip remove unexciting command', () => {
    querier.addCommand({ id: '1' } as Command);
    expect(querier.getCommands()).toHaveLength(1);
    querier.removeCommand({ id: '2' } as Command);
    expect(querier.getCommands()).toHaveLength(1);
  });

  it('+removeCommand() should remove relative commands', () => {
    querier.addCommand(new SelectCommand(new Field('', '')));
    expect(querier.getCommands()).toHaveLength(2);
    querier.removeCommand(new SelectCommand(new Field('', '')));
    expect(querier.getCommands()).toHaveLength(0);
  });

  it('+removeCommand() should skip remove relative command', () => {
    querier.addCommand(new SelectCommand(new Field('', '')));
    expect(querier.getCommands()).toHaveLength(2);
    querier.removeCommand(new GroupByCommand(new Field('', '')));
    expect(querier.getCommands()).toHaveLength(2);
  });

  it('+addCommand() should throw error if addition command not compatible', () => {
    const notCompatibleCommand = ({ compatible: () => false } as unknown) as Command;
    expect(() => querier.addCommand(notCompatibleCommand)).toThrow();
  });

  it('+hasCommand() should returns false if command not exist', () => {
    expect(querier.hasCommand({ id: '1' } as Command)).toBe(false);
  });

  it('+hasCommand() should returns true if command exist', () => {
    querier.addCommand(new GroupByCommand(new Field('', '')));
    expect(querier.hasCommand(new GroupByCommand(new Field('', '')))).toBe(true);
  });
});
