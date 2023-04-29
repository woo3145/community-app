import { CSSProperties } from 'react';
import styles from './styles.module.scss';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  job?: string;
  annual?: number;
  style?: CSSProperties;
}
export const AvatarCareer = ({
  job,
  annual,
  style,
  isLoading,
}: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div style={style} className={`${styles.badge}`}>
        <Skeleton inline width={36} height={16} />
        <Skeleton inline width={36} height={16} style={{ marginLeft: 8 }} />
      </div>
    );
  }
  return (
    <div style={style} className={`${styles.badge}`}>
      {job && <span className={styles.job}>{job}</span>}
      <span style={{ marginLeft: job ? '8px' : 0 }} className={styles.annual}>
        {!annual || annual === 0 ? '신입' : `${annual}년차`}
      </span>
    </div>
  );
};
