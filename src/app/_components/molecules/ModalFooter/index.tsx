import Button from '../../atoms/Button';

import styles from './styles.module.scss';

interface Props {
  text: string;
  isValid?: boolean;
  onClick?: () => void;
}

export const ModalFooter = ({ text, isValid = true, onClick }: Props) => {
  return (
    <div className={styles.bottom}>
      <Button
        type={onClick ? 'button' : 'submit'}
        text={text}
        wide
        isValid={isValid}
        onClick={onClick}
        dataCy="modal-button"
      />
    </div>
  );
};
