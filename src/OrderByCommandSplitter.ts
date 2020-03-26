import { CommandSplitter } from './CommandSplitter';
import { Direction, OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { Field } from './core/Field';
import { uniqueFilter } from './utils/uniqueFilter';

export class OrderByCommandSplitter extends CommandSplitter {
  getDirections(commands: OrderByCommand[], field?: Field): Direction[] {
    return commands
      .filter((command) => !field || command.field.id === field?.id)
      .map((command) => command.direction)
      .filter(uniqueFilter());
  }
}
