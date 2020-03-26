import { assert } from '../utils/assert';
import { Command } from './Command';

export class Querier {
  private commandMap: Map<string, Command> = new Map();

  getCommands(): Command[] {
    return [...this.commandMap.values()];
  }

  hasCommand(command: Command): boolean {
    return this.getCommands().some((c) => c.isMatch(command));
  }

  addCommand(command: Command): void {
    assert(command.compatible?.(this) ?? true, 'Command not compatible');
    this.commandMap.set(command.id, command);
    command.relativeCommands?.forEach((c) => this.addCommand(c));
  }

  removeCommand(command: Command): void {
    if (!this.commandMap.has(command.id) || this.isRelativeCommand(command)) return;
    this.commandMap.delete(command.id);
    command.relativeCommands?.forEach((c) => this.removeCommand(c));
  }

  private isRelativeCommand(command: Command): boolean {
    return this.getCommands().some((c) => c.relativeCommands?.some((rc) => rc.isMatch(command)));
  }
}
