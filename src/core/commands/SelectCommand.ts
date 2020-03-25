import { Field } from '../Field';
import { Command, CommandType } from './Command';
import { GroupByCommand } from './GroupByCommand';

export class SelectCommand extends Command {
  static isSelectCommand(command: Command): command is SelectCommand {
    return command.type === CommandType.Select;
  }

  constructor(field: Field) {
    super(CommandType.Select, field);
  }

  relativeCommands(): Command[] {
    return [new GroupByCommand(this.field)];
  }
}
