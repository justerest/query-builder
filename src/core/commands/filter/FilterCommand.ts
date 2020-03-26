import { createId } from 'src/utils/createId';
import { Command, CommandType } from '../../Command';
import { Field } from '../../Field';
import { Filter } from './Filter';

export class FilterCommand extends Command {
  static isFilterCommand(command: Command): command is FilterCommand {
    return command.type === CommandType.Filter;
  }

  constructor(field: Field, public filter: Filter) {
    super(CommandType.Filter, field);
    this.id = createId(this.id, filter.id);
  }
}
