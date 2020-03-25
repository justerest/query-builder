import { makeId } from 'src/utils/makeId';

export class Field {
  id: string;
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.id = makeId(name, type);
    this.name = name;
    this.type = type;
  }
}
