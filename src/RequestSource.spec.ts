import { Field } from './Field';
import { RequestSource } from './RequestSource';

describe('RequestSource', () => {
  let source: RequestSource;

  beforeEach(() => (source = new RequestSource([{ name: 'prop1', type: 'number' }])));

  it('should be created', () => {
    expect(source).toBeInstanceOf(RequestSource);
  });

  it('+isAvailableField() should returns false if field not match', () => {
    expect(source.isAvailableField({} as Field)).toBe(false);
  });

  it('+isAvailableField() should returns true if field match', () => {
    expect(source.isAvailableField({ name: 'prop1', type: 'number' })).toBe(true);
  });
});
