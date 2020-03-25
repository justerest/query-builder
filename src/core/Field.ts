export class Field {
  id: string;
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.id = [name, type].join('-').toLowerCase();
    this.name = name;
    this.type = type;
  }
}
