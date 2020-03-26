import { makeId } from 'src/utils/makeId';
import { Field } from './Field';
import { Querier } from './Querier';

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

  compatible(querier: Querier): boolean {
    return this.isSameCompatible(querier) && this.isRelativeCommandsCompatible(querier);
  }

  protected isSameCompatible(querier: Querier): boolean {
    return true;
  }

  private isRelativeCommandsCompatible(querier: Querier): boolean {
    return this.relativeCommands?.every((rc) => rc.compatible(querier)) ?? true;
  }

  isMatch(command: Command): boolean {
    return this.isCommandWithSameField(command) && this.type === command.type;
  }

  protected isCommandWithSameField(command: Command): boolean {
    return this.field.id === command.field.id;
  }
}
