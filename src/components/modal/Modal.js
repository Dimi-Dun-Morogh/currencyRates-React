import React, { useState, useContext } from 'react';
import './modal.scss';
import { Login } from '../login/Login';
import { SignUp } from '../signUp/SignUp';
import { RateContext } from '../../context/RateContext';

export const Modal = () => {
  const { state, modalHideHandler } = useContext(RateContext);
  const [value, setValue] = useState('login');
  const links = [
    { name: 'Вход', id: 'login' },
    { name: 'Регистрация', id: 'signUp' },
  ];

  const cls = ['modal'];
  const windowHandler = (id) => {
    setValue(id);
  };
  if (state.showModal) {
    cls.push('modalShow');
  }

  return (
    <div className={cls.join(' ')}>
      <>
        <div className="modalHead">
          <ul>
            {links.map((link) => {
              return (
                <li
                  style={{
                    fontWeight: link.id === value ? 'bold' : 'normal',
                    cursor: 'pointer',
                  }}
                  key={link.name}
                  onClick={() => windowHandler(link.id)}
                >
                  {link.name}
                </li>
              );
            })}
          </ul>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={modalHideHandler}
          />
        </div>
        <hr />
      </>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#f01f30' }}>{state.err}</h2>
      </div>

      {value === 'signUp' ? <SignUp /> : <Login />}
    </div>
  );
};
