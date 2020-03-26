import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { AggregateCommand, AggregateOperation } from './core/commands/AggregateCommand';
import { GroupByCommand } from './core/commands/groupBy/GroupByCommand';
import { GroupByCommandBuilder } from './core/commands/groupBy/GroupByCommandBuilder';
import { Direction, OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { OrderByCommandBuilder } from './core/commands/orderBy/OrderByCommandBuilder';
import { PresentationCommandBuilder } from './core/commands/PresentationCommandBuilder';
import { SelectCommand } from './core/commands/SelectCommand';
import { Field } from './core/Field';
import { Querier } from './core/Querier';
import { OrderByCommandSplitter } from './OrderByCommandSplitter';
import { PresentationCommandSplitter } from './PresentationCommandSplitter';

const presentationCommandBuilder = new PresentationCommandBuilder();
const groupByCommandBuilder = new GroupByCommandBuilder();
const orderByCommandBuilder = new OrderByCommandBuilder();
const fields = [new Field('prop1', 'string'), new Field('prop2', 'number')];
const querier = new Querier();

const App: React.FC = () => {
  const [, update] = useState({});
  const queryPresentationCommands = querier
    .getCommands()
    .filter(
      (command): command is SelectCommand | AggregateCommand =>
        SelectCommand.isSelectCommand(command) || AggregateCommand.isAggregateCommand(command),
    );
  return (
    <main>
      <h3>Presentation Operations</h3>
      <ul>
        {queryPresentationCommands.map((command) => (
          <li
            key={command.id}
            onClick={() => {
              querier.removeCommand(command);
              update({});
            }}
          >
            {command.field.name} {(command as AggregateCommand).aggregateOperation}
          </li>
        ))}
      </ul>
      <PresentationSelectCmp></PresentationSelectCmp>
      <h3>Group By Fields</h3>
      <ul>
        {querier
          .getCommands()
          .filter(GroupByCommand.isGroupByCommand)
          .map((command) => (
            <li
              key={command.id}
              onClick={() => {
                querier.removeCommand(command);
                update({});
              }}
            >
              grouped by {command.field.name}
            </li>
          ))}
      </ul>
      <ul>
        {groupByCommandBuilder.getAvailableCommands(fields, querier).map((command) => (
          <li
            key={command.id}
            onClick={() => {
              querier.addCommand(command);
              update({});
            }}
          >
            {command.field.name}
          </li>
        ))}
      </ul>
      <h3>Order By Fields</h3>
      <ul>
        {querier
          .getCommands()
          .filter(OrderByCommand.isOrderByCommand)
          .map((command) => (
            <li
              key={command.id}
              onClick={() => {
                querier.removeCommand(command);
                update({});
              }}
            >
              ordered by {command.field.name} {command.direction}
            </li>
          ))}
      </ul>
      <OrderBySelectCmp></OrderBySelectCmp>
    </main>
  );

  function PresentationSelectCmp(): any {
    const [selectedField, selectField] = useState(undefined as Field | undefined);
    const [selectedAggregateOperation, selectAggregateOperation] = useState(
      undefined as AggregateOperation | undefined,
    );
    const presentationCommandSplitter = new PresentationCommandSplitter();
    const presentationCommands = presentationCommandBuilder.getAvailableCommands(fields, querier);
    const presentationFields = presentationCommandSplitter.getFields(presentationCommands);
    const aggregateOperations = presentationCommandSplitter.getAggregateOperations(
      presentationCommands,
      selectedField,
    );
    return (
      !!presentationCommands.length && (
        <>
          <select>
            <option value=''></option>
            {presentationFields.map((field) => (
              <option key={field.id} onClick={() => selectField(field)}>
                {field.name}
              </option>
            ))}
          </select>
          {selectedField && !!aggregateOperations.length && (
            <select>
              <option value=''></option>
              {aggregateOperations.map((aggregateOperation) => (
                <option
                  key={aggregateOperation}
                  onClick={() => selectAggregateOperation(aggregateOperation)}
                >
                  {aggregateOperation}
                </option>
              ))}
            </select>
          )}
          {selectedField && (selectedAggregateOperation || !aggregateOperations.length) && (
            <button
              onClick={() => {
                if (selectedAggregateOperation) {
                  querier.addCommand(
                    new AggregateCommand(selectedField, selectedAggregateOperation),
                  );
                } else {
                  querier.addCommand(new SelectCommand(selectedField));
                }
                update({});
              }}
            >
              add
            </button>
          )}
        </>
      )
    );
  }

  function OrderBySelectCmp(): any {
    const [selectedField, selectField] = useState(undefined as Field | undefined);
    const [selectedDirection, selectDirection] = useState(undefined as Direction | undefined);
    const orderByCommandSplitter = new OrderByCommandSplitter();
    const orderByCommands = orderByCommandBuilder.getAvailableCommands(fields, querier);
    const orderByFields = orderByCommandSplitter.getFields(orderByCommands);
    const directions = orderByCommandSplitter.getDirections(orderByCommands, selectedField);
    return (
      !!orderByCommands.length && (
        <>
          <select>
            <option value=''></option>
            {orderByFields.map((field) => (
              <option key={field.id} onClick={() => selectField(field)}>
                {field.name}
              </option>
            ))}
          </select>
          {selectedField && (
            <select>
              <option value=''></option>
              {directions.map((direction) => (
                <option key={direction} onClick={() => selectDirection(direction)}>
                  {direction}
                </option>
              ))}
            </select>
          )}
          {selectedField && selectedDirection && (
            <button
              onClick={() => {
                querier.addCommand(new OrderByCommand(selectedField, selectedDirection));
                update({});
              }}
            >
              add
            </button>
          )}
        </>
      )
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
