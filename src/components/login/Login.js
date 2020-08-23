import React, { useContext } from 'react';
import './login.scss';
import { Button } from '../button/Button';
import { RateContext } from '../../context/RateContext';

export const Login = () => {
  const { state, renderInputs, loginHandler } = useContext(RateContext);
  return (
    <>
      <div className="modalForm">{renderInputs()}</div>

      <div className="modalBtn">
        <Button
          click={loginHandler}
          text="Войти"
          disabled={!state.isFormValid}
        />
      </div>
    </>
  );
};
