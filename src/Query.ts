import { assert } from './assert';
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
    this.selectFields.push(selectField);
  }

  removeSelectFieldAt(index: number): void {
    this.selectFields.splice(index, 1);
  }
}
