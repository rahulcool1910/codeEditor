export const initialValue = `
import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
`;