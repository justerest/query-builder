import { Field } from '../Field';

export enum CommandType {
  Select = 'select',
  Aggregate = 'aggregate',
  GroupBy = 'groupBy',
}

export abstract class Command {
  id: string;
  field: Field;
  type: CommandType;

  constructor(type: CommandType, field: Field) {
    this.id = [type, field.id].join('-').toLowerCase();
    this.type = type;
    this.field = field;
  }

  compatible(commands: Command[]): boolean {
    return true;
  }

  relativeCommands(): Command[] {
    return [];
  }

  protected isCommandWithSameField = (command: Command): boolean =>
    command.field.id === this.field.id;
}
