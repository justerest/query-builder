import { Command } from './core/Command';
import { Field } from './core/Field';
import { uniqueFilter } from './utils/uniqueFilter';

export abstract class CommandSplitter {
  getFields(commands: Command[]): Field[] {
    return commands.map((command) => command.field).filter(uniqueFilter((field) => field.id));
  }
}
