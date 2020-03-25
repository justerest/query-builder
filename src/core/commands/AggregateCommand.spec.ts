import { Field } from '../Field';
import { AggregateCommand, AggregateOperation } from './AggregateCommand';
import { GroupByCommand } from './GroupByCommand';

const field = new Field('', '');

describe('AggregateCommand', () => {
  let command: AggregateCommand;

  beforeEach(() => {
    command = new AggregateCommand(field, AggregateOperation.AVG);
  });

  it('should be created', () => {
    expect(command).toBeInstanceOf(AggregateCommand);
  });

  it('+compatible() should returns false for aggregate command with same field', () => {
    const groupByCommand = new GroupByCommand(field);
    expect(command.compatible([groupByCommand])).toBe(false);
  });
});
