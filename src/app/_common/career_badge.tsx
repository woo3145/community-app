import styles from './career_badge.module.scss';

interface Props {
  job?: string;
  career?: string;
}
export const CareerBadge = ({ job, career }: Props) => {
  return (
    <div className={styles.badge}>
      <span>{job}</span>
      <span>{career}</span>
    </div>
  );
};
