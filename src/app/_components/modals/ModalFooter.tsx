import Button from '../atoms/Button';

interface Props {
  text: string;
  isValid?: boolean;
  onClick?: () => void;
}

export const ModalFooter = ({ text, isValid = true, onClick }: Props) => {
  return (
    <div className="w-full">
      <Button
        type={onClick ? 'button' : 'submit'}
        text={text}
        isWide
        isValid={isValid}
        onClick={onClick}
        dataCy="modal-button"
      />
    </div>
  );
};
