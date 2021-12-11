import React, { useState } from 'react';
import './App.scss';
import Preview from './Components/preview';



function App() {
  const [editor, setEditor] = useState(1);
  return (
    <div className="App bg-sand w-full h-[100vh]  items-center gap-3">
      {
        new Array(editor).fill(0).map(_=>{
          return <Preview/>
        })
      }
      {/* <Preview /> */}
      
    </div>
  );
}

export default App;
