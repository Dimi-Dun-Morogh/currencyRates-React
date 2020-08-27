import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import { RateContext } from '../../context/RateContext';

export const Navbar = () => {
  const { state } = useContext(RateContext);
  return (
    <nav>
      {state.auth ? (
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
      ) : (
        <ul>
          <li>
            <NavLink exact to="/">
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className="disabled"
              exact
              to="/calc"
              onClick={(e) => e.preventDefault()}
            >
              Калькулятор
            </NavLink>
          </li>
          <li>
            <NavLink
              className="disabled"
              exact
              to="/sample"
              onClick={(e) => e.preventDefault()}
            >
              Выборки
            </NavLink>
          </li>

          <li> Залогиньтесь чтоб открыть весь функционал</li>
        </ul>
      )}
    </nav>
  );
};
