import { Querier } from 'src/core/Querier';
import { Field } from '../../Field';
import { Direction, OrderByCommand } from './OrderByCommand';
import { OrderByCommandBuilder } from './OrderByCommandBuilder';

describe('OrderByCommandBuilder', () => {
  let builder: OrderByCommandBuilder;

  beforeEach(() => (builder = new OrderByCommandBuilder()));

  it('+getAvailableCommands() should returns commands with fields', () => {
    const commands = builder.getAvailableCommands([new Field('1', '1')]);
    expect(commands).toHaveLength(2);
  });

  it('+getAvailableCommands() should exclude incompatible commands', () => {
    const querier = new Querier();
    const field = new Field('1', '1');
    querier.addCommand(new OrderByCommand(field, Direction.Asc));
    const commands = builder.getAvailableCommands([field], querier);
    expect(commands).toHaveLength(0);
  });
});
