import { Field } from '../Field';
import { AggregateCommand, AggregateOperation } from './AggregateCommand';
import { GroupByCommand } from './GroupByCommand';

const field = new Field('', '');

describe('GroupByCommand', () => {
  let groupByCommand: GroupByCommand;

  beforeEach(() => {
    groupByCommand = new GroupByCommand(field);
  });

  it('should be created', () => {
    expect(groupByCommand).toBeInstanceOf(GroupByCommand);
  });

  it('+compatible() should returns false for aggregate command with same field', () => {
    const aggregateCommand = new AggregateCommand(field, AggregateOperation.SUM);
    expect(groupByCommand.compatible([aggregateCommand])).toBe(false);
  });
});
