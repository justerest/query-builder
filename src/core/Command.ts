import { makeId } from 'src/utils/makeId';
import { Field } from './Field';

export enum CommandType {
  Select = 'select',
  Aggregate = 'aggregate',
  GroupBy = 'groupBy',
}

export abstract class Command {
  id: string;
  field: Field;
  type: CommandType;
  relativeCommands?: Command[];

  constructor(type: CommandType, field: Field) {
    this.id = makeId(type, field.id);
    this.type = type;
    this.field = field;
  }

  compatible(commands: Command[]): boolean {
    return this.isSameCompatible(commands) && this.isRelativeCommandsCompatible(commands);
  }

  abstract isMatch(command: Command): boolean;

  private isRelativeCommandsCompatible(commands: Command[]): boolean {
    return this.relativeCommands?.every((rc) => rc.compatible(commands)) ?? true;
  }

  protected isSameCompatible(commands: Command[]): boolean {
    return true;
  }

  protected isCommandWithSameField = (command: Command): boolean =>
    command.field.id === this.field.id;
}
