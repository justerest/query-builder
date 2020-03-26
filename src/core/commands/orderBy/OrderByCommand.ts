import { Querier } from 'src/core/Querier';
import { createId } from 'src/utils/createId';
import { Command, CommandType } from '../../Command';
import { Field } from '../../Field';

export enum Direction {
  Asc = 'asc',
  Desc = 'desc',
}

export class OrderByCommand extends Command {
  static isOrderByCommand(command: Command): command is OrderByCommand {
    return command.type === CommandType.OrderBy;
  }

  constructor(field: Field, public direction: Direction) {
    super(CommandType.OrderBy, field);
    this.id = createId(this.id, direction);
  }

  protected isSameCompatible(querier: Querier): boolean {
    return !querier
      .getCommands()
      .some(
        (command) => OrderByCommand.isOrderByCommand(command) && command.field.id === this.field.id,
      );
  }
}
