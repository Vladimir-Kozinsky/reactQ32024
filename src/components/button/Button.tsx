import React, { useContext } from 'react';
import s from './Button.module.scss';
import { ThemeContext } from '../../App.tsx';

type ButtonProps = {
  text: string;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClickHandler }: ButtonProps) {
  const theme = useContext(ThemeContext);
  return (
    <button
      type="button"
      className={theme === 'light' ? s.button : s.button__dark}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
}

export default Button;
