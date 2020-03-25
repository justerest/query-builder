import { Command, CommandType } from '../Command';
import { Field } from '../Field';
import { AggregateCommand } from './AggregateCommand';
import { GroupByCommand } from './groupBy/GroupByCommand';

export class SelectCommand extends Command {
  static isSelectCommand(command: Command): command is SelectCommand {
    return command.type === CommandType.Select;
  }

  constructor(field: Field) {
    super(CommandType.Select, field);
  }

  // TODO: уточнить как должно работать
  // ?? может рекурсивно проверять relativeCommands?
  // Добавил, потому что нельзя сочетать AggregateCommand с GroupBy
  compatible(commands: Command[]): boolean {
    return !commands.filter(this.isCommandWithSameField).some(AggregateCommand.isAggregateCommand);
  }

  relativeCommands(): Command[] {
    return [new GroupByCommand(this.field)];
  }
}
