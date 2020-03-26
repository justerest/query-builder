import { GroupByCommand } from './core/commands/groupBy/GroupByCommand';
import { Field } from './core/Field';
import { GroupByCommandSplitter } from './GroupByCommandSplitter';

describe('GroupByCommandSplitter', () => {
  let commandSplitter: GroupByCommandSplitter;

  beforeEach(() => (commandSplitter = new GroupByCommandSplitter()));

  it('+getFields() should returns unique Field[]', () => {
    const commands = [new GroupByCommand(new Field('', '')), new GroupByCommand(new Field('', ''))];
    expect(commandSplitter.getFields(commands)).toEqual([new Field('', '')]);
  });
});
