import { Field } from './Field';

export class SelectOperation {
  constructor(public field: Field, public aggregateOperation?: string) {}

  isAggregateOperation(): boolean {
    return !!this.aggregateOperation;
  }
}
