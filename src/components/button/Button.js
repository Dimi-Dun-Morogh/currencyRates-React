import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export const Button = (props) => {
  return (
    <button
      type="button"
      className="btn"
      disabled={props.disabled}
      onClick={props.click ? () => props.click(props.arg) : undefined}
    >
      {props.text}
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func,
  text: PropTypes.string,
  arg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
};
Button.defaultProps = {
  arg: '',
  click: undefined,
  text: '',
};
