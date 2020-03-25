import { Field } from '../Field';
import { GroupByCommand } from './groupBy/GroupByCommand';
import { SelectCommand } from './SelectCommand';

const field = new Field('', '');

describe('SelectCommand', () => {
  let command: SelectCommand;

  beforeEach(() => {
    command = new SelectCommand(field);
  });

  it('should be created', () => {
    expect(command).toBeInstanceOf(SelectCommand);
  });

  it('+relativeCommands should returns [GroupByCommand with same field]', () => {
    const [groupByCommand] = command.relativeCommands();
    expect(groupByCommand.id).toBe(new GroupByCommand(field).id);
  });
});
