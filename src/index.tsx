import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { AggregateCommand } from './core/commands/AggregateCommand';
import { GroupByCommand } from './core/commands/groupBy/GroupByCommand';
import { GroupByCommandBuilder } from './core/commands/groupBy/GroupByCommandBuilder';
import { OrderByCommand } from './core/commands/orderBy/OrderByCommand';
import { OrderByCommandBuilder } from './core/commands/orderBy/OrderByCommandBuilder';
import { PresentationCommandBuilder } from './core/commands/PresentationCommandBuilder';
import { SelectCommand } from './core/commands/SelectCommand';
import { Field } from './core/Field';
import { Querier } from './core/Querier';

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
      <h3>Applied Presentation Operations</h3>
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
      <h3>Available Presentation Operations</h3>
      <ul>
        {presentationCommandBuilder.getAvailableCommands(fields, querier).map((command) => (
          <li
            key={command.id}
            onClick={() => {
              querier.addCommand(command);
              update({});
            }}
          >
            {command.field.name} {(command as AggregateCommand).aggregateOperation}
          </li>
        ))}
      </ul>
      <h3>Applied Group By Fields</h3>
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
      <h3>Available Group By Fields</h3>
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
      <h3>Applied Order By Fields</h3>
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
      <h3>Available Order By Fields</h3>
      <ul>
        {orderByCommandBuilder.getAvailableCommands(fields, querier).map((command) => (
          <li
            key={command.id}
            onClick={() => {
              querier.addCommand(command);
              update({});
            }}
          >
            {command.field.name} {command.direction}
          </li>
        ))}
      </ul>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
