import { Query } from './Query';
import { SelectOperation } from './SelectOperation';
import { SortCondition } from './SortCondition';

const selectOperation = new SelectOperation({ name: '', type: '' });

describe('Query', () => {
  let query: Query;

  beforeEach(() => {
    query = new Query();
  });

  it('should be created', () => {
    expect(query).toBeInstanceOf(Query);
  });

  it('+getSelectOperations() should returns SelectOperation[]', () => {
    expect(query.getSelectOperations()).toEqual([]);
  });

  it('+addSelectOperation() should add SelectOperation', () => {
    query.addSelectOperation(selectOperation);
    expect(query.getSelectOperations()).toEqual([selectOperation]);
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
