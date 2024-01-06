import React, { useState } from 'react';
import './App.css';

import { useNuiEvent } from './hooks/useNuiEvent';
import { useExitListener } from './hooks/useExitListener';
import { debugData } from './utils/debugData';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

function App() {
  const [isOpen, setOpen] = useState(false);

  useNuiEvent('setVisible', (data: boolean) => {
    console.log('setVisible', data);
    setOpen(data);
  });
  useExitListener(setOpen);

  if (!isOpen) return <div />;

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-p">
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          save and restart resource
          <br />
          Esc to close this box
        </p>
      </header>
    </div>
  );
}

export default App;
