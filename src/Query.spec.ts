import { Query } from './Query';
import { RequestSource } from './RequestSource';
import { SelectField } from './SelectField';

describe('Query', () => {
  let query: Query;
  let source: RequestSource;

  beforeEach(() => {
    query = new Query();
    source = { fields: [], isAvailableField: () => true };
  });

  it('should be created', () => {
    expect(query).toBeInstanceOf(Query);
  });

  it('+getSource() should returns undefined on init', () => {
    expect(query.getSource()).toBeUndefined();
  });

  it('+setSource() should set RequestSource', () => {
    query.setSource(source);
    expect(query.getSource()).toBe(source);
  });

  it('+getSelectFields() should returns SelectField[]', () => {
    expect(query.getSelectFields()).toEqual([]);
  });

  it('+addSelectField() should add SelectField', () => {
    query.setSource(source);
    const selectField = {} as SelectField;
    query.addSelectField(selectField);
    expect(query.getSelectFields()).toEqual([selectField]);
  });

  it('+addSelectField() should throw error if source not set', () => {
    const selectField = {} as SelectField;
    expect(() => query.addSelectField(selectField)).toThrow();
  });

  it('+setSource() should reset select fields', () => {
    query.setSource(source);
    const selectField = {} as SelectField;
    query.addSelectField(selectField);
    expect(query.getSelectFields()).toEqual([selectField]);
    query.setSource({} as RequestSource);
    expect(query.getSelectFields()).toEqual([]);
  });

  it('+removeSelectFieldAt() should remove select field at index', () => {
    query.setSource(source);
    const selectField = {} as SelectField;
    query.addSelectField(selectField);
    expect(query.getSelectFields()).toEqual([selectField]);
    query.removeSelectFieldAt(0);
    expect(query.getSelectFields()).toEqual([]);
  });

  it('+getGroupByFields() should returns GroupByField[]', () => {
    expect(query.getGroupByFields()).toEqual([]);
  });

  it('+addSelectField() without aggregate operation should add groupByFields', () => {
    query.setSource(source);
    query.addSelectField({ isAggregate: () => false } as SelectField);
    expect(query.getGroupByFields().length).toBe(1);
  });

  it('+addSelectField() should throw error if field not match source', () => {
    query.setSource(new RequestSource([]));
    expect(() => query.addSelectField({} as SelectField)).toThrow();
  });
});
