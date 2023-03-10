'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  IoAdd,
  IoClose,
  IoCloseOutline,
  IoImageOutline,
} from 'react-icons/io5';
import styles from './page.module.scss';

interface FormData {
  title: string;
  content: string;
}

interface CreatePostResponse {
  message: string;
  postId: number;
}

export default function Write() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { isValid },
  } = useForm<FormData>();

  const {
    ref: contentRef,
    onChange: onChangeContent,
    ...contentRefRest
  } = register('content', {
    required: true,
  });
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

  const onSubmit = async (data: FormData) => {
    try {
      const { title, content } = data;

      const response = await (
        await fetch(`/api/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            published: true,
            imageUrl: '',
            tags: [4, 5, 6],
          }),
        })
      ).json();

      if (response.error) {
        // 에러처리
        return;
      }
      const { postId } = response as CreatePostResponse;
      console.log(postId);
      router.push(`/post/${postId}`);
    } catch (e) {
      console.log('error : ', e);
    }
  };

  if (status !== 'loading' && !session) {
    redirect('/login');
  }

  return (
    <main className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.writeHeaderWrapper}>
          <div className={styles.writeHeader}>
            <button type="submit" className={isValid ? styles.validButton : ''}>
              등록하기
            </button>
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
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div className={styles.content}>
            <textarea
              {...contentRefRest}
              name="content"
              ref={(e) => {
                contentRef(e);
                textareaRef.current = e;
              }}
              onChange={(e) => {
                onChangeContent(e);
                resize();
              }}
              placeholder="내용을 작성해주세요."
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
      </form>
    </main>
  );
}
