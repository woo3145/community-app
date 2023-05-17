interface Props {
  id?: string;
  text: string;
  type?: ButtonType;
  isValid?: boolean;
  isWide?: boolean;
  uiSize?: UISize;
  icon?: React.ReactNode;
  dataCy?: string;
  theme?: 'primary' | 'cancel' | 'warning';
  className?: string;
  onClick?: () => void;
}

const Button = ({
  id = '',
  text,
  onClick,
  type = 'button',
  isValid = true,
  isWide = false,
  uiSize = 'md',
  theme = 'primary',
  icon,
  dataCy,
  className,
}: Props) => {
  const buttonThemes = {
    primary: 'bg-violet-500 text-white hover:bg-violet-700',
    cancel: 'bg-gray-500 text-white hover:bg-gray-400',
    warning: 'bg-red-600 text-white hover:bg-red-500',
  };
  const buttonSizes = {
    sm: 'py-2 px-6',
    md: 'py-2 px-7',
    lg: 'py-3 px-8',
  };

  const baseClassName = 'font-bold rounded-full shadow-md shrink-0';

  const themeClassName =
    (isValid && buttonThemes[theme]) ||
    (!isValid && 'bg-gray-400 text-white opacity-50 cursor-default');

  const sizeClassName = buttonSizes[uiSize];

  const wideClassName = isWide && 'w-full flex-1';

  const integrationClassName = `${baseClassName} ${themeClassName} ${sizeClassName} ${wideClassName} ${className}`;

  return (
    <button
      data-cy={dataCy}
      id={id}
      type={type}
      onClick={onClick}
      disabled={!isValid}
      className={integrationClassName}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
