import { Querier } from 'src/core/Querier';
import { Field } from '../../Field';
import { Direction, OrderByCommand } from './OrderByCommand';

const field = new Field('', '');

describe('OrderByCommand', () => {
  let command: OrderByCommand;

  beforeEach(() => {
    command = new OrderByCommand(field, Direction.Asc);
  });

  it('should be created', () => {
    expect(command).toBeInstanceOf(OrderByCommand);
  });

  it('+compatible() should returns false for order by command with same field', () => {
    const orderByCommand = new OrderByCommand(field, Direction.Desc);
    const querier = new Querier();
    querier.addCommand(orderByCommand);
    expect(command.compatible(querier)).toBe(false);
  });
});
