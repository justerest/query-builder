import { AggregateCommand, AggregateOperation } from './core/commands/AggregateCommand';
import { SelectCommand } from './core/commands/SelectCommand';
import { Field } from './core/Field';
import { PresentationCommandSplitter } from './PresentationCommandSplitter';

describe('PresentationCommandSplitter', () => {
  let commandSplitter: PresentationCommandSplitter;

  beforeEach(() => (commandSplitter = new PresentationCommandSplitter()));

  it('+getAggregateOperations() should returns unique AggregateOperation[]', () => {
    const commands = [
      new AggregateCommand(new Field('', ''), AggregateOperation.Average),
      new AggregateCommand(new Field('', ''), AggregateOperation.Average),
      new AggregateCommand(new Field('2', ''), AggregateOperation.Count),
      new AggregateCommand(new Field('2', ''), AggregateOperation.Count),
    ];
    expect(commandSplitter.getAggregateOperations(commands)).toEqual([
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
    expect(commandSplitter.getAggregateOperations(commands, new Field('', ''))).toEqual([
      AggregateOperation.Average,
    ]);
  });

  it('+getAggregateOperations() should returns empty[] for SelectCommand', () => {
    const commands = [new SelectCommand(new Field('', ''))];
    expect(commandSplitter.getAggregateOperations(commands)).toEqual([]);
  });
});
