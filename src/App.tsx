import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Preview from './Components/preview';
import { addCell } from './store/actions-creators';
import { rootState } from './store/reducers';
import * as UUID from 'uuid';
import { cellState } from './store/reducers/cellReducers';
import { initialValue } from './constants/initialCode';
function App() {
  const [editor, setEditor] = useState(1);
  const cellData = useSelector((store: { cells: cellState }) => store.cells);
  const dispatch = useDispatch();

  const addNewBlock = () => {
    const data = addCell(UUID.v4(), 'code', initialValue);
    dispatch(data);
  };
  return (
    <div className="App bg-sand w-full h-[100vh]  items-center gap-3 overflow-scroll">
      {Object.values(cellData.data).map((data, index) => {
        return (
          <Preview
            id={data.id}
            content={data.content}
            type={data.type}
            key={index}
          />
        );
      })}
      <button onClick={addNewBlock}>Add New Block</button>
    </div>
  );
}

export default App;
