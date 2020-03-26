import { Querier } from 'src/core/Querier';
import { Field } from '../../Field';
import { AggregateCommand, AggregateOperation } from '../AggregateCommand';
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
    const aggregateCommand = new AggregateCommand(field, AggregateOperation.Summa);
    const querier = new Querier();
    querier.addCommand(aggregateCommand);
    expect(groupByCommand.compatible(querier)).toBe(false);
  });
});
