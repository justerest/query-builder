import { Query, SortCondition } from './Query';
import { RequestSource } from './RequestSource';
import { SelectOperation } from './SelectOperation';

const selectOperation = new SelectOperation({ name: '', type: '' });

describe('Query', () => {
  let query: Query;

  beforeEach(() => {
    query = new Query();
    query.setSource({ fields: [], isAvailableField: () => true });
  });

  it('should be created', () => {
    expect(query).toBeInstanceOf(Query);
  });

  it('+getSource() should returns undefined on init', () => {
    query = new Query();
    expect(query.getSource()).toBeUndefined();
  });

  it('+setSource() should set RequestSource', () => {
    const newSource = {} as RequestSource;
    query.setSource(newSource);
    expect(query.getSource()).toBe(newSource);
  });

  it('+getSelectOperations() should returns SelectOperation[]', () => {
    expect(query.getSelectOperations()).toEqual([]);
  });

  it('+addSelectOperation() should add SelectOperation', () => {
    query.addSelectOperation(selectOperation);
    expect(query.getSelectOperations()).toEqual([selectOperation]);
  });

  it('+addSelectOperation() should throw error if source not set', () => {
    query = new Query();
    expect(() => query.addSelectOperation(selectOperation)).toThrow();
  });

  it('+setSource() should reset select fields', () => {
    query.addSelectOperation(selectOperation);
    expect(query.getSelectOperations()).toEqual([selectOperation]);
    query.setSource({} as RequestSource);
    expect(query.getSelectOperations()).toEqual([]);
  });

  it('+removeSelectOperationAt() should remove select field at index', () => {
    query.addSelectOperation(selectOperation);
    expect(query.getSelectOperations()).toEqual([selectOperation]);
    query.removeSelectOperationAt(0);
    expect(query.getSelectOperations()).toEqual([]);
  });

  it('+getGroupByFields() should returns GroupByField[]', () => {
    expect(query.getGroupByFields()).toEqual([]);
  });

  it('+addSelectOperation() not aggregate operation should add groupByFields', () => {
    query.addSelectOperation({ isAggregateOperation: () => false } as SelectOperation);
    expect(query.getGroupByFields().length).toBe(1);
  });

  it('+addSelectOperation() should throw error if field not match source', () => {
    query.setSource(new RequestSource([]));
    expect(() => query.addSelectOperation({} as SelectOperation)).toThrow();
  });

  it('+addGroupByField() should add Field', () => {
    const field = { name: '', type: '' };
    query.addGroupByField(field);
    expect(query.getGroupByFields()).toEqual([field]);
  });

  it('+removeGroupByFieldAt() should remove Field at index', () => {
    const field = { name: '', type: '' };
    query.addGroupByField(field);
    query.removeGroupByFieldAt(0);
    expect(query.getGroupByFields()).toEqual([]);
  });

  it('+addGroupByField() should throw error if field not from source', () => {
    query.setSource(new RequestSource([]));
    const field = { name: '', type: '' };
    expect(() => query.addGroupByField(field)).toThrow();
  });

  it('+addGroupByField() should throw error if no source', () => {
    query = new Query();
    const field = { name: '', type: '' };
    expect(() => query.addGroupByField(field)).toThrow();
  });

  it('+addGroupByField() should throw error if exist aggregate operation with same field', () => {
    const field = { name: '', type: '' };
    query.addSelectOperation({ field, isAggregateOperation: () => true });
    expect(() => query.addGroupByField(field)).toThrow();
  });

  it('+addSelectOperation() aggregate operation should throw error if exist same group by field', () => {
    const field = { name: '', type: '' };
    query.addGroupByField(field);
    expect(() => query.addSelectOperation({ field, isAggregateOperation: () => true })).toThrow();
  });

  it('+addSelectOperation() not aggregate operation should not throw error if exist same group by field', () => {
    const field = { name: '', type: '' };
    query.addGroupByField(field);
    query.addSelectOperation({ field, isAggregateOperation: () => false });
    expect(query.getSelectOperations()).toHaveLength(1);
  });

  it('+setSource() should reset group by fields', () => {
    query.addGroupByField({ name: '', type: '' });
    query.setSource({} as RequestSource);
    expect(query.getGroupByFields()).toEqual([]);
  });

  it('+getSortConditions() should returns SortCondition[]', () => {
    expect(query.getSortConditions()).toEqual([]);
  });

  it('+addSortConditions() should add SortConditions', () => {
    const sortCondition: SortCondition = {} as SortCondition;
    query.addSortCondition(sortCondition);
    expect(query.getSortConditions()).toEqual([sortCondition]);
  });

  it('+removeSortConditions() should remove sortCondition at index', () => {
    const sortCondition: SortCondition = {} as SortCondition;
    query.addSortCondition(sortCondition);
    query.removeSortConditions(0);
    expect(query.getSortConditions()).toEqual([]);
  });
});
