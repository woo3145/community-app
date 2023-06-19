import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  dataCy: string;
  text: string;
  onClick: () => void;
}

export const SelectedTag = ({ dataCy, text, onClick }: Props) => {
  return (
    <div
      className="flex items-center justify-center px-2 py-1 font-bold border border-solid rounded-full border-primary text-primary"
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
