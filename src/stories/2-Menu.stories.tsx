import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from '../components/Menu/menu';
import SubMenu from '../components/Menu/subMenu';
import MenuItem from '../components/Menu/menuItem';

const defaultMenu = () => (
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
)

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
