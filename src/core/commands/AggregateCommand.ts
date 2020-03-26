import { makeId } from 'src/utils/makeId';
import { Command, CommandType } from '../Command';
import { Field } from '../Field';
import { GroupByCommand } from './groupBy/GroupByCommand';

export enum AggregateOperation {
  Count = 'count',
  Average = 'avg',
  Summa = 'sum',
}

export class AggregateCommand extends Command {
  static isAggregateCommand(command: Command): command is AggregateCommand {
    return command.type === CommandType.Aggregate;
  }

  constructor(field: Field, public aggregateOperation: AggregateOperation) {
    super(CommandType.Aggregate, field);
    this.id = makeId(this.id, aggregateOperation);
  }

  protected isSameCompatible(commands: Command[]): boolean {
    return !commands.filter(GroupByCommand.isGroupByCommand).some(this.isCommandWithSameField);
  }

  isMatch(command: Command): boolean {
    return (
      AggregateCommand.isAggregateCommand(command) &&
      this.isCommandWithSameField(command) &&
      (!command.aggregateOperation || command.aggregateOperation === this.aggregateOperation)
    );
  }
}
