import React, { useContext } from 'react';
import './signUp.scss';
import { Button } from '../button/Button';
import { RateContext } from '../../context/RateContext';

export const SignUp = () => {
  const { state, renderInputs, signUpHandler } = useContext(RateContext);
  return (
    <>
      <div className="modalForm">{renderInputs()}</div>

      <div className="modalBtn">
        <Button
          click={signUpHandler}
          text="Зарегистрироваться"
          disabled={!state.isFormValid}
        />
      </div>
    </>
  );
};
