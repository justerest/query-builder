import { GroupByCommand } from './commands/GroupByCommand';
import { Field } from './Field';
import { Querier } from './Querier';

export class GroupByCommandBuilder {
  getAvailableCommands(fields: Field[], querier?: Querier): GroupByCommand[] {
    const querierCommands = querier?.getCommands() ?? [];
    const querierCommandIdSet = new Set(querierCommands.map((command) => command.id));
    return fields
      .map((field) => new GroupByCommand(field))
      .filter((command) => !querierCommandIdSet.has(command.id))
      .filter((command) => command.compatible(querierCommands));
  }
}
