import { Querier } from 'src/core/Querier';
import { Command, CommandType } from '../../Command';
import { Field } from '../../Field';

export enum Direction {
  Asc = 'asc',
  Desc = 'desc',
}

export class OrderByCommand extends Command {
  static getBaseOrderByCommand(field: Field): Command {
    return new OrderByCommand(field, '' as any);
  }

  static isOrderByCommand(command: Command): command is OrderByCommand {
    return command.type === CommandType.OrderBy;
  }

  constructor(field: Field, public direction: Direction) {
    super(CommandType.OrderBy, field);
  }

  protected isSameCompatible(querier: Querier): boolean {
    return !querier.hasCommand(OrderByCommand.getBaseOrderByCommand(this.field));
  }

  isMatch(command: Command): boolean {
    return (
      super.isMatch(command) &&
      (!(command as OrderByCommand).direction ||
        this.direction === (command as OrderByCommand).direction)
    );
  }
}
