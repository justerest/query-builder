import { createId } from 'src/utils/createId';
import { Field } from './Field';
import { Querier } from './Querier';

export enum CommandType {
  Select = 'select',
  Aggregate = 'aggregate',
  GroupBy = 'groupBy',
  OrderBy = 'orderBy',
  Filter = 'filter',
}

export abstract class Command {
  id: string;
  field: Field;
  type: CommandType;
  relativeCommands?: Command[];

  constructor(type: CommandType, field: Field) {
    this.id = createId(type, field.id);
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
    return this.id.startsWith(command.id);
  }
}
