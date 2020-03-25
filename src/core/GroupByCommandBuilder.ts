import { CommandBuilder } from './CommandBuilder';
import { GroupByCommand } from './commands/GroupByCommand';
import { Field } from './Field';

export class GroupByCommandBuilder extends CommandBuilder<GroupByCommand> {
  protected createCommands(field: Field): GroupByCommand[] {
    return [new GroupByCommand(field)];
  }
}
