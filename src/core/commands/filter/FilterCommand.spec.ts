import { Querier } from 'src/core/Querier';
import { Field } from '../../Field';
import { Condition, Filter } from './Filter';
import { FilterCommand } from './FilterCommand';

const field = new Field('', '');

describe('FilterCommand', () => {
  let command: FilterCommand;

  beforeEach(() => {
    command = new FilterCommand(field, new Filter(Condition.Eq));
  });

  it('should be created', () => {
    expect(command).toBeInstanceOf(FilterCommand);
  });

  it('+compatible() should returns true for filter command with same field', () => {
    const filterCommand = new FilterCommand(field, new Filter(Condition.Gt));
    const querier = new Querier();
    querier.addCommand(filterCommand);
    expect(command.compatible(querier)).toBe(true);
  });
});
