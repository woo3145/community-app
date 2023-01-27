import { Inter } from '@next/font/google';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { WriteButton } from '../components/write_button';

import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  params: {
    slug: string;
  };
}

export default function CommunitySlug({ params }: Props) {
  return (
    <div className={styles.wrapper}>
      <section className={styles.write_button_section}>
        <WriteButton />
      </section>
      <section>{params.slug}</section>
    </div>
  );
}
