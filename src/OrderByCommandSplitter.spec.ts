import { Direction, OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { Field } from './core/Field';
import { OrderByCommandSplitter } from './OrderByCommandSplitter';

describe('OrderByCommandSplitter', () => {
  let orderByCommandSplitter: OrderByCommandSplitter;

  beforeEach(() => (orderByCommandSplitter = new OrderByCommandSplitter()));

  it('getDirections() should returns unique directions', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('1', '2'), Direction.Desc),
    ];
    expect(orderByCommandSplitter.getDirections(commands)).toEqual([Direction.Asc, Direction.Desc]);
  });

  it('getDirections() should returns existing directions', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Asc),
    ];
    expect(orderByCommandSplitter.getDirections(commands)).toEqual([Direction.Asc]);
  });

  it('getDirections() should returns unique directions of Command filtered by field', () => {
    const field1 = new Field('', '');
    const field2 = new Field('1', '2');
    const commands = [
      new OrderByCommand(field1, Direction.Asc),
      new OrderByCommand(field1, Direction.Asc),
      new OrderByCommand(field2, Direction.Desc),
    ];
    expect(orderByCommandSplitter.getDirections(commands, field1)).toEqual([Direction.Asc]);
    expect(orderByCommandSplitter.getDirections(commands, field2)).toEqual([Direction.Desc]);
  });
});
