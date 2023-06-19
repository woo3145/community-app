import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  title: string;
  closeModal: () => void;
}

export const ModalHeader = ({ title, closeModal }: Props) => {
  return (
    <div className="absolute top-0 left-0 z-30 flex items-center justify-center w-full bg-white border-b xl:border-b-0 xl:rounded-t-md h-14">
      <h2 className="text-lg font-bold">{title}</h2>
      <button onClick={closeModal} className="absolute text-2xl right-4">
        <IoCloseOutline />
      </button>
    </div>
  );
};
