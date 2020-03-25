import { assert } from './assert';
import { Field } from './Field';
import { Query } from './Query';
import { RequestSource } from './RequestSource';
import { SelectOperation } from './SelectOperation';

export enum AggregateOperation {
  COUNT = 'COUNT',
  AVG = 'AVG',
  SUM = 'SUM',
}

export class QueryBuilder {
  private source?: RequestSource;
  private query = new Query();

  getSource(): RequestSource | undefined {
    return this.source;
  }

  setSource(source: RequestSource): void {
    this.source = source;
  }

  getAvailableGroupByFields(): Field[] {
    const queryGroupByFields = this.query.getGroupByFields();
    return this.source?.fields.filter((f) => !Field.some(queryGroupByFields, f)) ?? [];
  }

  addGroupByField(field: Field): void {
    assert(Field.some(this.getAvailableGroupByFields(), field), 'Field not available');
    this.query.addGroupByField(field);
  }

  getAvailableSelectOperationFields(): Field[] {
    return this.source?.fields ?? [];
  }

  getAvailableSelectOperationsForField(field: Field): SelectOperation[] {
    if (field.type === 'number') {
      return Object.values(AggregateOperation)
        .map((aggregateOperation) => new SelectOperation(field, aggregateOperation))
        .concat(new SelectOperation(field));
    }
    return [new SelectOperation(field)];
  }

  addSelectOperation(selectOperation: SelectOperation): void {
    this.query.addSelectOperation(selectOperation);
  }
}
