import { CSSProperties } from 'react';

interface Props {
  id?: string;
  text: string;
  type?: ButtonType;
  onClick?: () => void;
  isValid?: boolean;
  wide?: boolean;
  selected?: boolean;
  size?: UISize;
  icon?: React.ReactNode;
  style?: CSSProperties;
  dataCy?: string;
  theme?: 'primary' | 'cancel' | 'warning';
  className?: string;
}

const Button = ({
  id,
  text,
  onClick,
  type = 'button',
  isValid = true,
  wide = false,
  selected = false,
  size = 'md',
  theme = 'primary',
  icon,
  style,
  dataCy,
  className,
}: Props) => {
  const themes = {
    primary: 'bg-violet-500 text-white hover:bg-violet-700',
    cancel: 'bg-gray-500 text-white hover:bg-gray-400',
    warning: 'bg-red-600 text-white hover:bg-red-500',
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
      className={`font-bold rounded-full shadow-md shrink-0 ${
        isValid && themes[theme]
      } ${sizes[size]} ${
        !isValid && 'bg-gray-400 text-white opacity-50 cursor-default'
      } ${selected && 'border-primary text-primary'} ${
        wide && 'w-full flex-1'
      } ${className}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
