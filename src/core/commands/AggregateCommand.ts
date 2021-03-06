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
}
