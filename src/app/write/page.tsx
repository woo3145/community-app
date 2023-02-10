'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  IoAdd,
  IoClose,
  IoCloseOutline,
  IoCloseSharp,
  IoImageOutline,
} from 'react-icons/io5';
import styles from './page.module.scss';

export default function Write() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    if (!textareaRef.current) return;
    if (!hiddenTextareaRef.current) return;

    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;
    hiddenTextarea.value = textarea.value;
    hiddenTextarea.style.height = 'auto';
    textarea.style.height = `${hiddenTextarea.scrollHeight}px`;
  };
  return (
    <main className={styles.wrapper}>
      <div className={styles.writeHeaderWrapper}>
        <div className={styles.writeHeader}>
          <button>등록하기</button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.tagSection}>
          <div className={styles.tagMessage}>
            <span>태그 선택</span>
            <span>(1~3개)</span>
            <span>*</span>
          </div>
          <div className={styles.tagSelectorContainer}>
            <button className={styles.tagAddButton}>
              <IoAdd />
            </button>
            <button className={styles.tagPlaceholder}></button>
            <div className={styles.selectedTagList}>
              <div className={styles.selectedTag}>
                <span>개발</span>
                <button>
                  <IoCloseOutline />
                </button>
              </div>
              <div className={styles.selectedTag}>
                <span>고민</span>
                <button>
                  <IoCloseOutline />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <input type="text" placeholder="제목을 입력해주세요." />
        </div>
        <div className={styles.content}>
          <textarea
            name=""
            id=""
            placeholder="내용을 작성해주세요."
            ref={textareaRef}
            onChange={resize}
          ></textarea>
          <textarea
            className={styles.hiddenTextarea}
            ref={hiddenTextareaRef}
          ></textarea>
          <div className={styles.imageContainer}>
            <button>
              <IoClose />
            </button>

            <Image
              src={
                'https://images.unsplash.com/photo-1661956602116-aa6865609028'
              }
              width={800}
              height={800}
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className={styles.addImageButtonContainer}>
        <div className={styles.tooltip}>
          <span>사진을 추가해 보세요!</span>
          <div className={styles.bubblePoint}></div>
        </div>
        <button>
          <IoImageOutline />
          <span>
            (<em>0</em>/1)
          </span>
        </button>
      </div>
    </main>
  );
}
