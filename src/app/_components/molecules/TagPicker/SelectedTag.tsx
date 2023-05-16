import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  dataCy: string;
  text: string;
  onClick: () => void;
}

export const SelectedTag = ({ dataCy, text, onClick }: Props) => {
  return (
    <div
      className="flex justify-center items-center px-2 py-1 mr-2 border border-solid border-primary rounded-full text-primary font-bold"
      data-cy={dataCy}
    >
      <span className="text-sm">{text}</span>
      <button
        type="button"
        onClick={onClick}
        data-cy={`${dataCy}-remove-button`}
        className="text-lg"
      >
        <IoCloseOutline />
      </button>
    </div>
  );
};
