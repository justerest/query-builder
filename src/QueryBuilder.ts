import { Field } from './Field';
import { Query } from './Query';
import { RequestSource } from './RequestSource';
import { SelectOperation } from './SelectOperation';

export class QueryBuilder {
  private source?: RequestSource;
  private query = new Query();

  getSource(): RequestSource | undefined {
    return this.source;
  }

  setSource(source: RequestSource): void {
    this.source = source;
    this.query.setSource(source);
  }

  getAvailableGroupByFields(): Field[] {
    const queryGroupByFields = this.query.getGroupByFields();
    return this.source?.fields.filter((f) => !Field.some(queryGroupByFields, f)) ?? [];
  }

  addGroupByField(field: Field): void {
    this.query.addGroupByField(field);
  }

  getAvailableSelectOperationFields(): Field[] {
    return this.source?.fields ?? [];
  }

  addSelectOperation(selectOperation: SelectOperation): void {
    this.query.addSelectOperation(selectOperation);
  }
}
