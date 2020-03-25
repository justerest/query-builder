import { Field } from './Field';

export class SelectField {
  constructor(public field: Field, public operation: string) {}

  isAggregate(): boolean {
    return false;
  }
}
