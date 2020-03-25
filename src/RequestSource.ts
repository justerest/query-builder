import { Field } from './Field';

export class RequestSource {
  constructor(public fields: Field[]) {}

  isAvailableField(field: Field): boolean {
    return Field.some(this.fields, field);
  }
}
