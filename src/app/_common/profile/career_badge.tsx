import styles from './career_badge.module.scss';

interface Props {
  job?: string;
  annual: number;
}
export const CareerBadge = ({ job, annual }: Props) => {
  return (
    <div className={styles.badge}>
      {job && <span>{job}</span>}
      <span>{annual === 0 ? '신입' : `${annual}년차`}</span>
    </div>
  );
};
