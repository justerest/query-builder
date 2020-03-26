import { Querier } from 'src/core/Querier';
import { Command, CommandType } from '../../Command';
import { Field } from '../../Field';
import { AggregateCommand } from '../AggregateCommand';

export class GroupByCommand extends Command {
  static isGroupByCommand(command: Command): command is GroupByCommand {
    return command.type === CommandType.GroupBy;
  }

  constructor(field: Field) {
    super(CommandType.GroupBy, field);
  }

  protected isSameCompatible(querier: Querier): boolean {
    return !querier
      .getCommands()
      .some(
        (command) =>
          AggregateCommand.isAggregateCommand(command) && command.field.id === this.field.id,
      );
  }
}
