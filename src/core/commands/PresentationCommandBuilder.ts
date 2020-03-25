import { CommandBuilder } from '../CommandBuilder';
import { Field, FieldType } from '../Field';
import { AggregateCommand, AggregateOperation } from './AggregateCommand';
import { SelectCommand } from './SelectCommand';

export class PresentationCommandBuilder extends CommandBuilder<SelectCommand | AggregateCommand> {
  protected createCommands(field: Field): Array<SelectCommand | AggregateCommand> {
    if (field.type === FieldType.Number) {
      return [new SelectCommand(field), ...this.createAggregateCommands(field)];
    }
    return [new SelectCommand(field)];
  }

  private createAggregateCommands(field: Field): AggregateCommand[] {
    return Object.values(AggregateOperation).map(
      (operation) => new AggregateCommand(field, operation),
    );
  }
}
