import { assert } from './assert';
import { Field } from './Field';
import { RequestSource } from './RequestSource';
import { SelectField } from './SelectField';

export class Query {
  private source?: RequestSource;
  private selectFields: SelectField[] = [];

  getSource(): RequestSource | undefined {
    return this.source;
  }

  setSource(source: RequestSource): void {
    this.source = source;
    this.selectFields = [];
  }

  getSelectFields(): SelectField[] {
    return this.selectFields;
  }

  addSelectField(selectField: SelectField): void {
    assert(this.source, 'Source not assigned');
    assert(this.source.isAvailableField(selectField.field), 'Field not exist in source');
    this.selectFields.push(selectField);
  }

  removeSelectFieldAt(index: number): void {
    this.selectFields.splice(index, 1);
  }

  getGroupByFields(): Field[] {
    return this.selectFields
      .filter((selectField) => !selectField.isAggregate())
      .map((selectField) => selectField.field);
  }
}
