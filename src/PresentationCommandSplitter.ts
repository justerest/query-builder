import { CommandSplitter } from './CommandSplitter';
import { AggregateCommand, AggregateOperation } from './core/commands/AggregateCommand';
import { SelectCommand } from './core/commands/SelectCommand';
import { Field } from './core/Field';
import { uniqueFilter } from './utils/uniqueFilter';

export class PresentationCommandSplitter extends CommandSplitter {
  getAggregateOperations(
    commands: Array<SelectCommand | AggregateCommand>,
    field?: Field,
  ): AggregateOperation[] {
    return commands
      .filter(AggregateCommand.isAggregateCommand)
      .filter((command) => !field || command.field.id === field?.id)
      .map((command) => command.aggregateOperation)
      .filter(uniqueFilter());
  }
}
