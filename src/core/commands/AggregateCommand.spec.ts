import { Field } from '../Field';
import { Querier } from '../Querier';
import { AggregateCommand, AggregateOperation } from './AggregateCommand';
import { GroupByCommand } from './groupBy/GroupByCommand';

const field = new Field('', '');

describe('AggregateCommand', () => {
  let command: AggregateCommand;

  beforeEach(() => {
    command = new AggregateCommand(field, AggregateOperation.Average);
  });

  it('should be created', () => {
    expect(command).toBeInstanceOf(AggregateCommand);
  });

  it('+compatible() should returns false for group by command with same field', () => {
    const groupByCommand = new GroupByCommand(field);
    const querier = new Querier();
    querier.addCommand(groupByCommand);
    expect(command.compatible(querier)).toBe(false);
  });

  it('should match base aggregate command', () => {
    expect(command.isMatch(AggregateCommand.getBaseAggregateCommand(field))).toBe(true);
  });

  it('should not match another aggregate command', () => {
    expect(command.isMatch(new AggregateCommand(field, AggregateOperation.Count))).toBe(false);
  });

  it('should match same aggregate command', () => {
    expect(command.isMatch(new AggregateCommand(field, AggregateOperation.Average))).toBe(true);
  });
});
