import React from 'react';
import ReactDOM from 'react-dom/client';
import Increasable from './increasable';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Increasable
      maxCount={2}
      defaultElementCount={3}
      rootElement={'allow salam'}
      render={({ Elm, increaseElement }) => {
        return (
          <div>
            {Elm}
            <button onClick={increaseElement}>add more</button>
          </div>
        );
      }}
    />
  </React.StrictMode>
);
