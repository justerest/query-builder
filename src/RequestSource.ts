import { Field } from './Field';

export class RequestSource {
  constructor(public fields: Field[]) {}

  isAvailableField(field: Field): boolean {
    return this.fields.some((f) => f.name === field.name && f.type === field.type);
  }
}
