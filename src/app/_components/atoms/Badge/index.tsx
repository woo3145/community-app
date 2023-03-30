import styles from './styles.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
  size?: UISize;
}

const Badge = ({ text, onClick, size = 'md' }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.badge} ${styles[size]} ${
        onClick !== undefined ? styles.cursor : ''
      }`}
    >
      {text}
    </div>
  );
};

export default Badge;
