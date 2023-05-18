import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  title: string;
  closeModal: () => void;
}

export const ModalHeader = ({ title, closeModal }: Props) => {
  return (
    <div className="flex justify-center items-center pb-5 relative">
      <h2 className="text-lg font-bold">{title}</h2>
      <button onClick={closeModal} className="text-2xl absolute right-0">
        <IoCloseOutline />
      </button>
    </div>
  );
};
