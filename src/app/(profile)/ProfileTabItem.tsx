interface NavItemProps {
  isSelected: boolean;
  text: string;
  onClick: () => void;
}
export const ProfileTabItem = ({ isSelected, text, onClick }: NavItemProps) => {
  const baseClassName = 'pb-2 cursor-pointer text-gray-500';
  const selectedClassName =
    (isSelected &&
      'border-b-2 border-solid border-primary text-primary font-bold') ||
    '';

  const integrationClassName = `${baseClassName} ${selectedClassName}`;
  return (
    <div onClick={onClick} className={integrationClassName}>
      {text}
    </div>
  );
};
