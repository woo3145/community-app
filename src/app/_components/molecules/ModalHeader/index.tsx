import { IoCloseOutline } from 'react-icons/io5';
import styles from './styles.module.scss';

interface Props {
  title: string;
  closeModal: () => void;
}

export const ModalHeader = ({ title, closeModal }: Props) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <button onClick={closeModal} className={styles.closeButton}>
        <IoCloseOutline />
      </button>
    </div>
  );
};
