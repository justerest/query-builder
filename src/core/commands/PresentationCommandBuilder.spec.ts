import { Field } from '../Field';
import { Querier } from '../Querier';
import { AggregateCommand, AggregateOperation } from './AggregateCommand';
import { GroupByCommand } from './groupBy/GroupByCommand';
import { PresentationCommandBuilder } from './PresentationCommandBuilder';
import { SelectCommand } from './SelectCommand';

const fields = [new Field('1', '1'), new Field('2', '2')];

describe('PresentationCommandBuilder', () => {
  let builder: PresentationCommandBuilder;

  beforeEach(() => (builder = new PresentationCommandBuilder()));

  it('+getAvailableCommands() should returns commands with fields', () => {
    const commandFields = builder.getAvailableCommands(fields).map((command) => command.field);
    expect(commandFields).toEqual(fields);
  });

  it('+getAvailableCommands() should exclude assigned to querier commands', () => {
    const querier = new Querier();
    querier.addCommand(new SelectCommand(new Field('1', '1')));
    const result = builder.getAvailableCommands(fields, querier).map((command) => command.field);
    expect(result).toEqual([new Field('2', '2')]);
  });

  it('+getAvailableCommands() should returns SelectCommand + ...AggregateCommands for number field', () => {
    const field = new Field('', 'number');
    const commands = builder.getAvailableCommands([field]);
    expect(commands).toHaveLength(Object.values(AggregateOperation).length + 1);
  });

  it('+getAvailableCommands() should exclude incompatible commands', () => {
    const querier = new Querier();
    const field = new Field('', 'number');
    querier.addCommand(new GroupByCommand(field));
    const commands = builder.getAvailableCommands([field], querier);
    expect(commands).toHaveLength(1);
  });
});
