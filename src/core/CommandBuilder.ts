import { Command } from './Command';
import { Field } from './Field';
import { Querier } from './Querier';

export abstract class CommandBuilder<TCommand extends Command> {
  getAvailableCommands(fields: Field[], querier?: Querier): TCommand[] {
    return fields
      .flatMap((field) => this.createCommands(field, querier))
      .filter((command) => !querier?.hasCommand(command))
      .filter((command) => !querier || command.compatible(querier));
  }

  protected abstract createCommands(field: Field, querier?: Querier): TCommand[];
}
