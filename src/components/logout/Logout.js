import React, { useContext } from 'react';
import './logout.scss';
import { Button } from '../button/Button';
import { RateContext } from '../../context/RateContext';

export const Logout = () => {
  const { logoutHandler } = useContext(RateContext);
  return (
    <>
      <div className="modalBtn">
        <Button text="Выйти" click={logoutHandler} />
      </div>
    </>
  );
};
