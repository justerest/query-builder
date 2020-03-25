import { CommandBuilder } from '../../CommandBuilder';
import { Field } from '../../Field';
import { GroupByCommand } from './GroupByCommand';

export class GroupByCommandBuilder extends CommandBuilder<GroupByCommand> {
  protected createCommands(field: Field): GroupByCommand[] {
    return [new GroupByCommand(field)];
  }
}
