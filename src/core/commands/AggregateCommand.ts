import { Field } from '../Field';
import { Command, CommandType } from './Command';
import { GroupByCommand } from './GroupByCommand';

export enum AggregateOperation {
  COUNT = 'COUNT',
  AVG = 'AVG',
  SUM = 'SUM',
}

export class AggregateCommand extends Command {
  static isAggregateCommand(command: Command): command is AggregateCommand {
    return command.type === CommandType.Aggregate;
  }

  constructor(field: Field, public aggregateOperation: AggregateOperation) {
    super(CommandType.Aggregate, field);
  }

  compatible(commands: Command[]): boolean {
    return !commands.filter(GroupByCommand.isGroupByCommand).some(this.isCommandWithSameField);
  }
}
