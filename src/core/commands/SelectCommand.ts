import { Command, CommandType } from '../Command';
import { Field } from '../Field';
import { GroupByCommand } from './groupBy/GroupByCommand';

export class SelectCommand extends Command {
  static isSelectCommand(command: Command): command is SelectCommand {
    return command.type === CommandType.Select;
  }

  relativeCommands: Command[] = [new GroupByCommand(this.field)];

  constructor(field: Field) {
    super(CommandType.Select, field);
  }
}
