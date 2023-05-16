interface Props {
  id?: string;
  text: string;
  selected: boolean;
  onClick: () => void;
  dataCy: string;
}

export const SelectButton = ({
  id,
  text,
  selected,
  onClick,
  dataCy,
}: Props) => {
  return (
    <button
      id={id}
      data-cy={dataCy}
      onClick={onClick}
      className={`py-2 px-6 text-sm rounded-full shrink-0 font-semibold bg-white border border-solid border-gray-200 text-gray-500 hover:bg-gray-100 ${
        selected && 'border-primary text-primary hover:bg-white'
      }`}
      type="button"
    >
      {text}
    </button>
  );
};
