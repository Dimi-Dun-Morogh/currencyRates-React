import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/calc">
            Калькулятор
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/sample">
            Выборки
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/info">
            Информация
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
