import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='arrow-down' theme='primary' size='10x' />
        <Menu
          defaultIndex='0'
          // onSelect={index => console.log(index)}
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
