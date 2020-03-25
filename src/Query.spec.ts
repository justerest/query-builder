import { Query } from './Query';
import { RequestSource } from './RequestSource';

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
});
