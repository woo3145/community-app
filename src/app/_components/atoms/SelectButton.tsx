interface Props {
  id?: string;
  text: string;
  uiSize?: UISize;
  isSelected: boolean;
  onClick: () => void;
  dataCy: string;
  className?: string;
}

export const SelectButton = ({
  id,
  text,
  isSelected,
  uiSize = 'sm',
  onClick,
  dataCy,
  className,
}: Props) => {
  const buttonSizes = {
    sm: 'py-2 px-6 text-sm',
    md: 'py-2 px-7 text-md',
    lg: 'py-3 px-8 text-lg',
  };

  const baseClassName = `rounded-full shrink-0 font-semibold bg-white ${
    !isSelected && 'hover:bg-gray-100'
  }`;

  const sizeClassName = buttonSizes[uiSize];

  const borderClassName = `border border-solid ${
    isSelected ? 'border-primary text-primary' : 'border-gray-200 text-gray-500'
  }`;

  const integrationClassName = `${baseClassName} ${sizeClassName} ${borderClassName} ${className}`;

  return (
    <button
      id={id}
      data-cy={dataCy}
      onClick={onClick}
      className={integrationClassName}
      type="button"
    >
      {text}
    </button>
  );
};
