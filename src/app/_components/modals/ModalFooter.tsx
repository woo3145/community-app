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
    <div className="absolute bottom-0 left-0 z-30 flex items-center justify-center w-full px-4 bg-white border-t h-14 xl:border-none xl:rounded-b-md">
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
