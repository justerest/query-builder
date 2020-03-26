import { Command } from './core/Command';
import { AggregateCommand, AggregateOperation } from './core/commands/AggregateCommand';
import { Direction, OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { SelectCommand } from './core/commands/SelectCommand';
import { Field } from './core/Field';
import { uniqueFilter } from './utils/uniqueFilter';

export function getFields(commands: Command[]): Field[] {
  return commands.map((command) => command.field).filter(uniqueFilter((field) => field.id));
}

export function getDirections(commands: OrderByCommand[], field?: Field): Direction[] {
  return commands
    .filter((command) => !field || command.field.id === field.id)
    .map((command) => command.direction)
    .filter(uniqueFilter());
}

type PresentationCommand = SelectCommand | AggregateCommand;

export function getAggregateOperations(
  commands: PresentationCommand[],
  field?: Field,
): AggregateOperation[] {
  return commands
    .filter(AggregateCommand.isAggregateCommand)
    .filter((command) => !field || command.field.id === field.id)
    .map((command) => command.aggregateOperation)
    .filter(uniqueFilter());
}
