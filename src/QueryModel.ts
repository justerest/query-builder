export interface SortConditionModel {
  name: string;
  direction?: 'asc' | 'desc';
}

export enum AggOperation {
  COUNT = 'COUNT',
  AVG = 'AVG',
  SUM = 'SUM',
}

export interface FieldWithOperationModel {
  name: string;
  op?: AggOperation;
}

export enum QueryFilterOperation {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Neq = 'neq',
  In = 'in',
}

export interface QueryFilterConditionModel {
  name: string;
  op: QueryFilterOperation;
  value: string | number | Array<string | number>;
}

export enum DatasourceFieldTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATETIME = 'datetime',
}

export interface DatasourceFieldInfo {
  displayName: string;
  name: string;
  type: DatasourceFieldTypes;
}

export interface QueryModel {
  datasource: DatasourceModel;
  selectFields: FieldWithOperationModel[];
  groupByFields?: string[];
  orderByFields?: SortConditionModel[];
  filters?: QueryFilterConditionModel[];
}

export interface DatasourceModel {
  id: number;
  name: string;
  dispalyName: string;
  fields: DatasourceFieldInfo[];
  isReference: boolean;
}
