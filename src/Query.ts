import { assert } from './assert';
import { Field } from './Field';
import { RequestSource } from './RequestSource';
import { SelectOperation } from './SelectOperation';

enum Direction {
  Asc = 'asc',
  Desc = 'desc',
}

export interface SortCondition {
  field: Field;
  direction: Direction;
}

export class Query {
  private source?: RequestSource;
  private selectOperations: SelectOperation[] = [];
  private groupByFields: Field[] = [];
  private sortConditions: SortCondition[] = [];

  getSource(): RequestSource | undefined {
    return this.source;
  }

  setSource(source: RequestSource): void {
    this.source = source;
    this.selectOperations = [];
    this.groupByFields = [];
    this.sortConditions = [];
  }

  getSelectOperations(): SelectOperation[] {
    return this.selectOperations;
  }

  addSelectOperation(selectOperation: SelectOperation): void {
    this.assertSourceAssigned();
    this.assertAvailableField(selectOperation.field);
    this.assertOperationAvailable(selectOperation);
    this.selectOperations.push(selectOperation);
  }

  private assertSourceAssigned(): void {
    assert(this.source, 'Source not assigned');
  }

  private assertAvailableField(field: Field): void {
    assert(this.source?.isAvailableField(field), 'Field not exist in source');
  }

  private assertOperationAvailable(selectOperation: SelectOperation): void {
    if (selectOperation.isAggregateOperation()) {
      assert(
        !this.includesGroupByField(selectOperation.field),
        'Can not add aggregate operation with same group by field',
      );
    }
  }

  private includesGroupByField(field: Field): boolean {
    return Field.some(this.getGroupByFields(), field);
  }

  removeSelectOperationAt(index: number): void {
    this.selectOperations.splice(index, 1);
  }

  getGroupByFields(): Field[] {
    return this.selectOperations
      .filter((selectOperation) => !selectOperation.isAggregateOperation())
      .map((selectOperation) => selectOperation.field)
      .concat(this.groupByFields);
  }

  addGroupByField(field: Field): void {
    this.assertSourceAssigned();
    this.assertAvailableField(field);
    this.assertNoAggregateOperationWithField(field);
    this.groupByFields.push(field);
  }

  private assertNoAggregateOperationWithField(field: Field): void {
    assert(
      !this.hasAggregateOperationWithField(field),
      'Can not assign group by field of aggregate operation',
    );
  }

  private hasAggregateOperationWithField(field: Field): boolean {
    const aggregateOperationFields = this.getSelectOperations()
      .filter((operation) => operation.isAggregateOperation())
      .map((operation) => operation.field);
    return Field.some(aggregateOperationFields, field);
  }

  removeGroupByFieldAt(index: number): void {
    this.groupByFields.splice(index, 1);
  }

  getSortConditions(): SortCondition[] {
    return this.sortConditions;
  }

  addSortCondition(sortCondition: SortCondition): void {
    this.assertSourceAssigned();
    this.assertAvailableField(sortCondition.field);
    this.sortConditions.push(sortCondition);
  }

  removeSortConditions(index: number): void {
    this.sortConditions.splice(index, 1);
  }
}
