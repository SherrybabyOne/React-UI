import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus> hello </Button>
        <Button> hello </Button>
        <Button disabled> hello </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> hello </Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com' target="_blank"> Baidu Link </Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com' disabled> Baidu Link </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
