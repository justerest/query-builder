import { Command, CommandType } from '../../Command';
import { Field } from '../../Field';
import { Filter } from './Filter';

export class FilterCommand extends Command {
  static getBaseFilterCommand(field: Field): Command {
    return new FilterCommand(field, '' as any);
  }

  static isFilterCommand(command: Command): command is FilterCommand {
    return command.type === CommandType.Filter;
  }

  constructor(field: Field, public filter: Filter) {
    super(CommandType.Filter, field);
  }

  isMatch(command: Command): boolean {
    return (
      super.isMatch(command) &&
      (!(command as FilterCommand).filter ||
        this.filter.id === (command as FilterCommand).filter.id)
    );
  }
}
