import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { QueryBuilder } from './core/QueryBuilder';
import { RequestSource } from './core/RequestSource';

const builder = new QueryBuilder();
builder.setSource(
  new RequestSource([
    { name: 'prop 1', type: 'string' },
    { name: 'prop 2', type: 'number' },
  ]),
);

const App: React.FC = () => {
  const [, update] = useState({});
  const query = builder.getQuery();
  return (
    <main>
      <h3>Applied Selected Operations</h3>
      <ul>
        {query.getSelectOperations().map((selectOperation, index) => (
          <li
            key={selectOperation.field.name + selectOperation.aggregateOperation}
            onClick={() => {
              query.removeSelectOperationAt(index);
              update({});
            }}
          >
            {selectOperation.field.name} {selectOperation.aggregateOperation ?? 'NO AGGR'}
          </li>
        ))}
      </ul>
      <h3>Available Selected Operations</h3>
      <ul>
        {builder.getAvailableSelectOperationFields().flatMap((field) =>
          builder.getAvailableSelectOperationsForField(field).map((selectOperation) => (
            <li
              key={field.name + selectOperation.aggregateOperation}
              onClick={() => {
                builder.addSelectOperation(selectOperation);
                update({});
              }}
            >
              {field.name} {selectOperation.aggregateOperation ?? 'NO AGGR'}
            </li>
          )),
        )}
      </ul>
      <h3>Applied Group By Fields</h3>
      <ul>
        {query.getGroupByFields().map((field, index) => (
          <li
            key={field.name}
            onClick={() => {
              query.removeGroupByFieldAt(index);
              update({});
            }}
          >
            group by {field.name}
          </li>
        ))}
      </ul>
      <h3>Available Group By Fields</h3>
      <ul>
        {builder.getAvailableGroupByFields().map((field) => (
          <li
            key={field.name}
            onClick={() => {
              builder.addGroupByField(field);
              update({});
            }}
          >
            {field.name}
          </li>
        ))}
      </ul>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
