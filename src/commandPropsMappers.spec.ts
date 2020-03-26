import { getAggregateOperations, getDirections, getFields } from './commandPropsMappers';
import { AggregateCommand, AggregateOperation } from './core/commands/AggregateCommand';
import { Direction, OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { SelectCommand } from './core/commands/SelectCommand';
import { Field } from './core/Field';

describe('getFields', () => {
  it('should returns unique Field[]', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Desc),
    ];
    expect(getFields(commands)).toEqual([new Field('', '')]);
  });

  it('getDirections() should returns unique directions', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('1', '2'), Direction.Desc),
    ];
    expect(getDirections(commands)).toEqual([Direction.Asc, Direction.Desc]);
  });

  it('getDirections() should returns existing directions', () => {
    const commands = [
      new OrderByCommand(new Field('', ''), Direction.Asc),
      new OrderByCommand(new Field('', ''), Direction.Asc),
    ];
    expect(getDirections(commands)).toEqual([Direction.Asc]);
  });

  it('getDirections() should returns unique directions of Command filtered by field', () => {
    const field1 = new Field('', '');
    const field2 = new Field('1', '2');
    const commands = [
      new OrderByCommand(field1, Direction.Asc),
      new OrderByCommand(field1, Direction.Asc),
      new OrderByCommand(field2, Direction.Desc),
    ];
    expect(getDirections(commands, field1)).toEqual([Direction.Asc]);
    expect(getDirections(commands, field2)).toEqual([Direction.Desc]);
  });

  it('+getAggregateOperations() should returns unique AggregateOperation[]', () => {
    const commands = [
      new AggregateCommand(new Field('', ''), AggregateOperation.Average),
      new AggregateCommand(new Field('', ''), AggregateOperation.Average),
      new AggregateCommand(new Field('2', ''), AggregateOperation.Count),
      new AggregateCommand(new Field('2', ''), AggregateOperation.Count),
    ];
    expect(getAggregateOperations(commands)).toEqual([
      AggregateOperation.Average,
      AggregateOperation.Count,
    ]);
  });

  it('+getAggregateOperations() should returns unique AggregateOperation[] for field', () => {
    const commands = [
      new AggregateCommand(new Field('', ''), AggregateOperation.Average),
      new AggregateCommand(new Field('', ''), AggregateOperation.Average),
      new AggregateCommand(new Field('2', ''), AggregateOperation.Count),
      new AggregateCommand(new Field('2', ''), AggregateOperation.Count),
    ];
    expect(getAggregateOperations(commands, new Field('', ''))).toEqual([
      AggregateOperation.Average,
    ]);
  });

  it('+getAggregateOperations() should returns empty[] for SelectCommand', () => {
    const commands = [new SelectCommand(new Field('', ''))];
    expect(getAggregateOperations(commands)).toEqual([]);
  });
});
