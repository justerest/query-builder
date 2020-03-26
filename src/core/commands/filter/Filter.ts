import { createId } from 'src/utils/createId';

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
    this.id = createId(condition);
    this.condition = condition;
  }
}
