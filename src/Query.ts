import { assert } from './assert';
import { Field } from './Field';
import { RequestSource } from './RequestSource';
import { SelectOperation } from './SelectOperation';

export class Query {
  private source?: RequestSource;
  private selectOperations: SelectOperation[] = [];

  getSource(): RequestSource | undefined {
    return this.source;
  }

  setSource(source: RequestSource): void {
    this.source = source;
    this.selectOperations = [];
  }

  getSelectOperations(): SelectOperation[] {
    return this.selectOperations;
  }

  addSelectOperation(selectOperation: SelectOperation): void {
    assert(this.source, 'Source not assigned');
    assert(this.source.isAvailableField(selectOperation.field), 'Field not exist in source');
    this.selectOperations.push(selectOperation);
  }

  removeSelectOperationAt(index: number): void {
    this.selectOperations.splice(index, 1);
  }

  getGroupByFields(): Field[] {
    return this.selectOperations
      .filter((selectOperation) => !selectOperation.isAggregateOperation())
      .map((selectOperation) => selectOperation.field);
  }
}
