import React, {
  useState,
  useContext,
  FC,
  MouseEvent,
  cloneElement,
  Children,
  FunctionComponentElement
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/Icon';
import Transition from '../Transition/transition';

export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
}

export const SubMenu: FC<SubMenuProps> = props => {
  const { title, index, className, children } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  let timer: any;
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  }
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: MouseEvent) => handleMouse(e, false),
  } : {};
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen,
    });
    const chilrenComponent = Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component');
      }
    });
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        classNames='zoom-in-top'
        appear
        unmountOnExit
      >
        <ul className={subMenuClasses}>
          {chilrenComponent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' onClick={handleClick} {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;
