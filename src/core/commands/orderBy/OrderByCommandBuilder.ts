import { CommandBuilder } from '../../CommandBuilder';
import { Field } from '../../Field';
import { Direction, OrderByCommand } from './OrderByCommand';

export class OrderByCommandBuilder extends CommandBuilder<OrderByCommand> {
  protected createCommands(field: Field): OrderByCommand[] {
    return [new OrderByCommand(field, Direction.Asc), new OrderByCommand(field, Direction.Desc)];
  }
}
