import { Command } from './core/Command';
import { Field } from './core/Field';
import { uniqueFilter } from './utils/uniqueFilter';

interface SelectParams<T, P> {
  select: (command: T) => P;
  unique?: (el: P) => unknown;
  filters?: Array<(el: T) => unknown>;
}

export class CommandSplitter {
  getFields(commands: Command[]): Field[] {
    return commands.map((command) => command.field).filter(uniqueFilter((field) => field.id));
  }

  select<P, T extends Command = Command>(commands: T[], params: SelectParams<T, P>): P[] {
    return commands
      .filter((command) => params.filters?.every((filter) => filter(command)) ?? true)
      .map(params.select)
      .filter(uniqueFilter(params.unique));
  }
}
