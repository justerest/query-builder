import { makeId } from 'src/utils/makeId';

export enum Condition {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Neq = 'neq',
  In = 'in',
}

export class Filter {
  id: string;
  condition: Condition;

  constructor(condition: Condition) {
    this.id = makeId('filter', condition);
    this.condition = condition;
  }
}
