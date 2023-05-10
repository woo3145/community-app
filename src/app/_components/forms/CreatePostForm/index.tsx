'use client';

import Button from '@/app/_components/atoms/Button';
import { TagPicker } from '../../molecules/TagPicker';
import { IoClose, IoImageOutline } from 'react-icons/io5';
import Image from 'next/image';
import { CreatePostFormValue } from '@/app/write/page';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useCreatePost } from '@/hooks/useCreatePost';

import styles from './styles.module.scss';

export const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePostFormValue>();
  const [selectedTags, setSelectedTags] = useState<SubTag[]>([]);

  const { preview, imageFile, resetImage, uploadImage, handleImage } =
    useUploadImage();

  const { onSubmit, isApiLoading } = useCreatePost(
    selectedTags,
    imageFile,
    uploadImage
  );

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.writeTopWrapper}>
        <div className={styles.writeTop}>
          <Button
            type="submit"
            text="등록하기"
            isValid={!isApiLoading && isValid}
            dataCy="submit-button"
          />
        </div>
      </div>
      <div className={styles.container}>
        {/* 태그 */}
        <TagPicker
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        {/* 제목 */}
        <div className={styles.title}>
          <input
            {...register('title', { required: true })}
            type="text"
            placeholder="제목을 입력해주세요."
            data-cy={'title-input'}
          />
        </div>
        {/* 내용 */}
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
            data-cy={'content-input'}
          ></textarea>
          <textarea
            className={styles.hiddenTextarea}
            ref={hiddenTextareaRef}
          ></textarea>

          {/* 이미지 */}
          {preview && (
            <div className={styles.imageContainer}>
              <button onClick={resetImage}>
                <IoClose />
              </button>

              <Image src={preview} width={800} height={800} alt="image" />
            </div>
          )}
        </div>
      </div>

      {/* 이미지 추가 버튼 */}
      <div className={styles.addImageButtonContainer}>
        <div className={styles.tooltip}>
          <span>사진을 추가해 보세요!</span>
          <div className={styles.bubblePoint}></div>
        </div>
        <label htmlFor="input-image" className={styles.uploadImageButton}>
          <IoImageOutline />
          <span>
            (<em>0</em>/1)
          </span>
        </label>
        <input
          type="file"
          name="image"
          id="input-image"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImage}
        />
      </div>
    </form>
  );
};
