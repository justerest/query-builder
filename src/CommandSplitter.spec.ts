import { CommandSplitter } from './CommandSplitter';
import { Command } from './core/Command';
import { Direction, OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { Field } from './core/Field';

describe('CommandSplitter', () => {
  let commandSplitter: CommandSplitter;

  beforeEach(() => (commandSplitter = new CommandSplitter()));

  it('getFields() should returns unique Field[]', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Desc),
    ];
    expect(commandSplitter.getFields(commands)).toEqual([new Field('', '')]);
  });

  it('select() should returns unique prop of Command', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('1', '2'), Direction.Desc),
    ];
    expect(commandSplitter.select(commands, { select: (command) => command.direction })).toEqual([
      Direction.Asc,
      Direction.Desc,
    ]);
  });

  it('select() should returns unique prop of Command filtered by field', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('1', '2'), Direction.Desc),
    ];
    expect(
      commandSplitter.select(commands, {
        select: (command) => command.direction,
        filters: [byFieldFilter(new Field('', ''))],
      }),
    ).toEqual([Direction.Asc]);
  });
});

function byFieldFilter(field: Field): (el: Command) => boolean {
  return (command: Command) => command.field.id === field.id;
}
