import { createId } from 'src/utils/createId';

export enum FieldType {
  Number = 'number',
}

export class Field {
  id: string;
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.id = createId(name, type);
    this.name = name;
    this.type = type;
  }
}
