import { Field } from './Field';

export enum Direction {
  Asc = 'asc',
  Desc = 'desc',
}

export interface SortCondition {
  field: Field;
  direction: Direction;
}
