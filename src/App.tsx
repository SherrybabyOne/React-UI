import React, { useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/Icon';
import Transition from './components/Transition/transition';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='arrow-down' theme='primary' size='10x' />
        <Menu
          defaultIndex='0'
          defaultOpenSubMenus={['2']}
          // mode='vertical'
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button size='lg' onClick={() => {setShow(!show)}}> Toggle </Button>
        <Transition in={show} timeout={300} animation='zoom-in-left'>
          <div>
            <p>Edit src/App.tsx and save to reload</p>
            <p>Edit src/App.tsx and save to reload</p>
            <p>Edit src/App.tsx and save to reload</p>
            <p>Edit src/App.tsx and save to reload</p>
            <p>Edit src/App.tsx and save to reload</p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
          wrapper
        >
          <Button btnType='primary' size='lg'>A Large Button</Button>
        </Transition>
        <hr />
        <Button autoFocus> hello </Button>
        <Button> hello </Button>
        <Button disabled> hello </Button>
        <Button btnType='primary' size='lg'> hello </Button>
        <Button btnType='link' href='http://www.baidu.com' target="_blank"> Baidu Link </Button>
        <Button btnType='link' href='http://www.baidu.com' disabled> Baidu Link </Button>
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
