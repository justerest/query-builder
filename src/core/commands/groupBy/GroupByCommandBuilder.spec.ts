import { Field } from '../../Field';
import { Querier } from '../../Querier';
import { AggregateCommand, AggregateOperation } from '../AggregateCommand';
import { GroupByCommand } from './GroupByCommand';
import { GroupByCommandBuilder } from './GroupByCommandBuilder';

const fields = [new Field('1', '1'), new Field('2', '2')];

describe('GroupByCommandBuilder', () => {
  let builder: GroupByCommandBuilder;

  beforeEach(() => (builder = new GroupByCommandBuilder()));

  it('+getAvailableCommands() should returns commands with fields', () => {
    const commandFields = builder.getAvailableCommands(fields).map((command) => command.field);
    expect(commandFields).toEqual(fields);
  });

  it('+getAvailableCommands() should exclude assigned to querier commands', () => {
    const querier = new Querier();
    querier.addCommand(new GroupByCommand(new Field('1', '1')));
    const result = builder.getAvailableCommands(fields, querier).map((command) => command.field);
    expect(result).toEqual([new Field('2', '2')]);
  });

  it('+getAvailableCommands() should exclude incompatible commands', () => {
    const querier = new Querier();
    querier.addCommand(new AggregateCommand(new Field('1', '1'), AggregateOperation.Average));
    const result = builder.getAvailableCommands(fields, querier).map((command) => command.field);
    expect(result).toEqual([new Field('2', '2')]);
  });
});
