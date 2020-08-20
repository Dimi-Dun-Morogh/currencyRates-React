import React from 'react';
import './button.scss';

export const Button = (props) => {
  return (
    <button
      type="button"
      className="btn"
      onClick={() => props.click(props.arg || '') || undefined}
    >
      {props.text}
    </button>
  );
};