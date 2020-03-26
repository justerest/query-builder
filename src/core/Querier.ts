import { assert } from '../utils/assert';
import { Command } from './Command';

export class Querier {
  private commands: Command[] = [];

  getCommands(): Command[] {
    return this.commands;
  }

  hasCommand(command: Command): boolean {
    return this.getCommands().some((c) => c.isMatch(command));
  }

  addCommand(command: Command): void {
    assert(command.compatible?.(this) ?? true, 'Command not compatible');
    if (this.hasCommand(command)) return;
    this.commands.push(command);
    command.relativeCommands?.forEach((c) => this.addCommand(c));
  }

  removeCommand(command: Command): void {
    const index = this.commands.findIndex((c) => c.isMatch?.(command));
    if (index === -1 || this.isRelativeCommand(command)) return;
    this.commands.splice(index, 1);
    command.relativeCommands?.forEach((c) => this.removeCommand(c));
  }

  private isRelativeCommand(command: Command): boolean {
    return this.commands.some((c) => c.relativeCommands?.some((rc) => rc.isMatch(command)));
  }
}
