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

  protected isSameCompatible(commands: Command[]): boolean {
    return !commands.filter(AggregateCommand.isAggregateCommand).some(this.isCommandWithSameField);
  }

  isMatch(command: Command): boolean {
    return GroupByCommand.isGroupByCommand(command) && this.isCommandWithSameField(command);
  }
}
