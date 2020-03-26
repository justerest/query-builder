import { Command } from './Command';
import { Field } from './Field';
import { Querier } from './Querier';

export abstract class CommandBuilder<TCommand extends Command = Command> {
  getAvailableCommands(fields: Field[], querier?: Querier): TCommand[] {
    const querierCommands = querier?.getCommands() ?? [];
    const querierCommandIdSet = new Set(querierCommands.map((command) => command.id));
    return fields
      .flatMap((field) => this.createCommands(field, querier))
      .filter((command) => !querierCommandIdSet.has(command.id))
      .filter((command) => !querier || command.compatible(querier));
  }

  protected abstract createCommands(field: Field, querier?: Querier): TCommand[];
}
