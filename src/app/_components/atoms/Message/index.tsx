interface Props {
  text: string;
  type?: MessageType;
  size?: UISize;
  position?: 'center' | 'left' | 'right';
  className: string;
  dataCy?: string;
}
const Message = ({
  text,
  type = 'guide',
  size = 'md',
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
  return (
    <p
      className={`${sizes[size]} ${positions[position]} ${types[type]} ${className}`}
      data-cy={dataCy}
    >
      {text}
    </p>
  );
};

export default Message;
