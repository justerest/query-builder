import { AggregateOperation, QueryBuilder } from './QueryBuilder';
import { RequestSource } from './RequestSource';

describe('QueryBuilder', () => {
  let builder: QueryBuilder;

  beforeEach(() => {
    builder = new QueryBuilder();
  });

  it('+getSource() should returns undefined on init', () => {
    builder = new QueryBuilder();
    expect(builder.getSource()).toBeUndefined();
  });

  it('+setSource() should set RequestSource', () => {
    const newSource = {} as RequestSource;
    builder.setSource(newSource);
    expect(builder.getSource()).toBe(newSource);
  });

  it('+getAvailableGroupByFields() should returns Field[] from source', () => {
    const field = { name: '', type: '' };
    builder.setSource(new RequestSource([field]));
    expect(builder.getAvailableGroupByFields()).toEqual([field]);
  });

  it('+addGroupByField() should remove Field from availableGroupByFields', () => {
    const field = { name: '', type: '' };
    builder.setSource(new RequestSource([field]));
    builder.addGroupByField(field);
    expect(builder.getAvailableGroupByFields()).toEqual([]);
  });

  it('+getAvailableSelectOperationFields() should returns Field[] from source', () => {
    const field = { name: '', type: '' };
    builder.setSource(new RequestSource([field]));
    expect(builder.getAvailableSelectOperationFields()).toEqual([field]);
  });

  it('+getAvailableSelectOperationsForField() should returns SelectOption[]', () => {
    const field = { name: '', type: '' };
    builder.setSource(new RequestSource([field]));
    expect(builder.getAvailableSelectOperationsForField(field)).toHaveLength(1);
  });

  it('+getAvailableSelectOperationsForField() should returns SelectOption[]', () => {
    const field = { name: '', type: 'number' };
    builder.setSource(new RequestSource([field]));
    const availableOperationsCount = Object.values(AggregateOperation).length + 1;
    expect(builder.getAvailableSelectOperationsForField(field)).toHaveLength(
      availableOperationsCount,
    );
  });
});
