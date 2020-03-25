import { Query } from './Query';
import { RequestSource } from './RequestSource';
import { SelectOperation } from './SelectOperation';

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

  it('+getSelectOperations() should returns SelectOperation[]', () => {
    expect(query.getSelectOperations()).toEqual([]);
  });

  it('+addSelectOperation() should add SelectOperation', () => {
    query.setSource(source);
    const selectOperation = {} as SelectOperation;
    query.addSelectOperation(selectOperation);
    expect(query.getSelectOperations()).toEqual([selectOperation]);
  });

  it('+addSelectOperation() should throw error if source not set', () => {
    const selectOperation = {} as SelectOperation;
    expect(() => query.addSelectOperation(selectOperation)).toThrow();
  });

  it('+setSource() should reset select fields', () => {
    query.setSource(source);
    const selectOperation = {} as SelectOperation;
    query.addSelectOperation(selectOperation);
    expect(query.getSelectOperations()).toEqual([selectOperation]);
    query.setSource({} as RequestSource);
    expect(query.getSelectOperations()).toEqual([]);
  });

  it('+removeSelectOperationAt() should remove select field at index', () => {
    query.setSource(source);
    const selectOperation = {} as SelectOperation;
    query.addSelectOperation(selectOperation);
    expect(query.getSelectOperations()).toEqual([selectOperation]);
    query.removeSelectOperationAt(0);
    expect(query.getSelectOperations()).toEqual([]);
  });

  it('+getGroupByFields() should returns GroupByField[]', () => {
    expect(query.getGroupByFields()).toEqual([]);
  });

  it('+addSelectOperation() not aggregate operation should add groupByFields', () => {
    query.setSource(source);
    query.addSelectOperation({ isAggregateOperation: () => false } as SelectOperation);
    expect(query.getGroupByFields().length).toBe(1);
  });

  it('+addSelectOperation() should throw error if field not match source', () => {
    query.setSource(new RequestSource([]));
    expect(() => query.addSelectOperation({} as SelectOperation)).toThrow();
  });
});
