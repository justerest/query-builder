import { Query } from './Query';

describe('Query', () => {
  let query: Query;

  beforeEach(() => (query = new Query()));

  it('should be created', () => {
    expect(query).toBeInstanceOf(Query);
  });
});
