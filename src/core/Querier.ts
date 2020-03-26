import { assert } from '../utils/assert';
import { Command } from './Command';

export class Querier {
  private commandIdSet: Set<string> = new Set();
  private commands: Command[] = [];

  getCommands(): Command[] {
    return this.commands;
  }

  hasCommand(command: Command): boolean {
    return this.getCommands().some((c) => c.isMatch(command));
  }

  addCommand(command: Command): void {
    assert(command.compatible?.(this) ?? true, 'Command not compatible');
    if (this.commandIdSet.has(command.id)) return;
    this.commands.push(command);
    this.commandIdSet.add(command.id);
    command.relativeCommands?.forEach((c) => this.addCommand(c));
  }

  removeCommand(command: Command): void {
    if (this.isRelativeCommand(command)) return;
    if (!this.commandIdSet.has(command.id)) return;
    const index = this.commands.findIndex((c) => c.id === command.id);
    assert(index !== -1, 'Remove command error');
    this.commands.splice(index, 1);
    this.commandIdSet.delete(command.id);
    command.relativeCommands?.forEach((c) => this.removeCommand(c));
  }

  private isRelativeCommand(command: Command): boolean {
    return this.commands.some((c) => c.relativeCommands?.some((rc) => rc.id === command.id));
  }
}
