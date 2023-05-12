import { CSSProperties } from 'react';

interface Props {
  id?: string;
  text: string;
  type?: ButtonType;
  onClick?: () => void;
  isValid?: boolean;
  wide?: boolean;
  outlined?: boolean;
  selected?: boolean;
  size?: UISize;
  icon?: React.ReactNode;
  style?: CSSProperties;
  dataCy?: string;
  theme?: 'primary' | 'cancel' | 'error';
}

const Button = ({
  id,
  text,
  onClick,
  type = 'button',
  isValid = true,
  wide = false,
  outlined = false,
  selected = false,
  size = 'md',
  theme = 'primary',
  icon,
  style,
  dataCy,
}: Props) => {
  const themes = {
    primary: 'bg-violet-500 text-white hover:bg-violet-700',
    cancel: '',
    error: '',
  };
  const sizes = {
    sm: 'py-2 px-6',
    md: 'py-2 px-7',
    lg: 'py-3 px-8',
  };
  return (
    <button
      data-cy={dataCy}
      id={id ? id : ''}
      type={type}
      onClick={onClick}
      disabled={!isValid}
      style={style}
      className={`font-bold rounded-full shadow-md shrink-0 ${themes[theme]} ${
        sizes[size]
      } ${
        !isValid &&
        'bg-gray-500 text-black opacity-30 hover:bg-gray-500 cursor-pointer'
      } ${selected && 'border-primary text-primary'} ${wide && 'w-full'}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
