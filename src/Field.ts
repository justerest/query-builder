export interface Field {
  name: string;
  type: string;
}

export class Field {
  static equals(field1: Field, field2: Field): boolean {
    return field1.name === field2.name && field1.type === field2.type;
  }

  static some(array: Field[], field: Field): boolean {
    return array.some((f) => Field.equals(f, field));
  }

  private constructor() {}
}
