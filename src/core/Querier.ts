import { assert } from '../utils/assert';
import { Command } from './commands/Command';

export class Querier {
  private commandIdSet: Set<string> = new Set();
  private commands: Command[] = [];

  getCommands(): Command[] {
    return this.commands;
  }

  addCommand(command: Command): void {
    assert(command.compatible?.(this.getCommands()) !== false, 'Command not compatible');
    if (!this.commandIdSet.has(command.id)) {
      this.commands.push(command);
      this.commandIdSet.add(command.id);
    }
    command.relativeCommands?.().forEach((c) => this.addCommand(c));
  }

  removeCommand(command: Command): void {
    if (this.commandIdSet.has(command.id)) {
      const index = this.commands.findIndex((c) => c.id === command.id);
      assert(index !== -1, 'Remove command error');
      this.commands.splice(index, 1);
      this.commandIdSet.delete(command.id);
    }
    command.relativeCommands?.().forEach((c) => this.removeCommand(c));
  }
}
