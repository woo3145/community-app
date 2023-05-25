import Button from '../atoms/Button';

interface Props {
  text: string;
  isValid?: boolean;
  onClick?: () => void;
  buttonDataCy?: string;
}

export const ModalFooter = ({
  text,
  isValid = true,
  onClick,
  buttonDataCy,
}: Props) => {
  return (
    <div className="w-full">
      <Button
        type={onClick ? 'button' : 'submit'}
        text={text}
        isWide
        isValid={isValid}
        onClick={onClick}
        dataCy={buttonDataCy ? buttonDataCy : 'modal-button'}
      />
    </div>
  );
};
