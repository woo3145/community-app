import { CSSProperties } from 'react';
import styles from './styles.module.scss';

interface Props {
  job?: string;
  annual: number;
  style?: CSSProperties;
}
export const AvatarCareer = ({ job, annual, style }: Props) => {
  return (
    <div style={style} className={`${styles.badge}`}>
      {job && <span>{job}</span>}
      <span>{annual === 0 ? '신입' : `${annual}년차`}</span>
    </div>
  );
};
