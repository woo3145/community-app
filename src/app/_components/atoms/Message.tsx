interface Props {
  text: string;
  type?: MessageType;
  uiSize?: UISize;
  position?: 'center' | 'left' | 'right';
  className: string;
  dataCy?: string;
}
const Message = ({
  text,
  type = 'guide',
  uiSize = 'md',
  position = 'left',
  className,
  dataCy,
}: Props) => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-md',
  };
  const positions = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const types = {
    guide: 'text-gray-400',
    error: 'text-red-500',
    success: 'text-blue-400',
  };

  const integrationClassName = `${sizes[uiSize]} ${positions[position]} ${types[type]} ${className}`;
  return (
    <p className={integrationClassName} data-cy={dataCy}>
      {text}
    </p>
  );
};

export default Message;
