import { CommandSplitter } from './CommandSplitter';
import { Direction, OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { Field } from './core/Field';

describe('CommandSplitter', () => {
  it('CommandSplitter.prototype.getFields() should returns unique Field[]', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Desc),
    ];
    expect(CommandSplitter.prototype.getFields(commands)).toEqual([new Field('', '')]);
  });
});
