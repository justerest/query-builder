import { Query } from './Query';
import { RequestSource } from './RequestSource';
import { SelectField } from './SelectField';

describe('Query', () => {
  let query: Query;

  beforeEach(() => (query = new Query()));

  it('should be created', () => {
    expect(query).toBeInstanceOf(Query);
  });

  it('+getSource() should returns undefined on init', () => {
    expect(query.getSource()).toBeUndefined();
  });

  it('+setSource() should set RequestSource', () => {
    const source = {} as RequestSource;
    query.setSource(source);
    expect(query.getSource()).toBe(source);
  });

  it('+getSelectFields() should returns SelectField[]', () => {
    expect(query.getSelectFields()).toEqual([]);
  });

  it('+addSelectField() should add SelectField', () => {
    query.setSource({} as RequestSource);
    const selectField = {} as SelectField;
    query.addSelectField(selectField);
    expect(query.getSelectFields()).toEqual([selectField]);
  });

  it('+addSelectField() should throw error id source not set', () => {
    const selectField = {} as SelectField;
    expect(() => query.addSelectField(selectField)).toThrow();
  });

  it('+setSource() should reset select fields', () => {
    query.setSource({} as RequestSource);
    const selectField = {} as SelectField;
    query.addSelectField(selectField);
    expect(query.getSelectFields()).toEqual([selectField]);
    query.setSource({} as RequestSource);
    expect(query.getSelectFields()).toEqual([]);
  });

  it('+removeSelectFieldAt() should remove select field at index', () => {
    query.setSource({} as RequestSource);
    const selectField = {} as SelectField;
    query.addSelectField(selectField);
    expect(query.getSelectFields()).toEqual([selectField]);
    query.removeSelectFieldAt(0);
    expect(query.getSelectFields()).toEqual([]);
  });
});
