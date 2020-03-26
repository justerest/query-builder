import { createId } from 'src/utils/createId';
import { Command, CommandType } from '../Command';
import { Field } from '../Field';
import { Querier } from '../Querier';
import { GroupByCommand } from './groupBy/GroupByCommand';

export enum AggregateOperation {
  Count = 'count',
  Average = 'avg',
  Summa = 'sum',
}

export class AggregateCommand extends Command {
  static getBaseAggregateCommand(field: Field): AggregateCommand {
    return new AggregateCommand(field, '' as any);
  }

  static isAggregateCommand(command: Command): command is AggregateCommand {
    return command.type === CommandType.Aggregate;
  }

  constructor(field: Field, public aggregateOperation: AggregateOperation) {
    super(CommandType.Aggregate, field);
    this.id = createId(this.id, aggregateOperation);
  }

  protected isSameCompatible(querier: Querier): boolean {
    return !querier.hasCommand(new GroupByCommand(this.field));
  }

  isMatch(command: Command): boolean {
    return (
      super.isMatch(command) &&
      (!(command as AggregateCommand).aggregateOperation ||
        (command as AggregateCommand).aggregateOperation === this.aggregateOperation)
    );
  }
}
