'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose, IoImageOutline } from 'react-icons/io5';
import Button from '../_components/atoms/Button';
import { TagPicker } from './components/tagPicker';
import styles from './page.module.scss';

interface PostFormData {
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
  } = useForm<PostFormData>();
  const [selectedTags, setSelectedTags] = useState<SubTag[]>([]);
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState<File>();

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

  const onSubmit = async (data: PostFormData) => {
    try {
      const { title, content } = data;
      if (!title) return console.log('제목을 입력해주세요.');
      if (!content) return console.log('내용을 입력해주세요.');
      if (!selectedTags.length) return console.log('태그를 선택해주세요.');

      // (이미지 업로드 후 url받아오기)
      let imagePath = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageResponse = await (
          await fetch(`/api/upload/image`, {
            method: 'POST',
            body: formData,
          })
        ).json();

        if (imageResponse.filePath) imagePath = imageResponse.filePath;
      }

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
            imageUrl: imagePath,
            tags: selectedTags.map((tag) => tag.id),
          }),
        })
      ).json();

      if (response.error) {
        // 에러처리
        return;
      }
      const { postId } = response as CreatePostResponse;
      router.push(`/post/${postId}`);
    } catch (e) {
      console.log('error : ', e);
    }
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || !event.target.files[0]) {
      console.log('선택된 이미지가 없습니다.');
      return;
    }
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setPreview(e.target.result);
      }
    };

    // const formData = new FormData();
    // formData.append(event.target.name, file);
    setImageFile(file);
  };

  if (status !== 'loading' && !session) {
    redirect('/login');
  }

  return (
    <main className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.writeTopWrapper}>
          <div className={styles.writeTop}>
            <Button type="submit" text="등록하기" isValid={isValid} />
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
            ></textarea>
            <textarea
              className={styles.hiddenTextarea}
              ref={hiddenTextareaRef}
            ></textarea>

            {/* 이미지 */}
            <div className={styles.imageContainer}>
              <button>
                <IoClose />
              </button>

              {preview && (
                <Image src={preview} width={800} height={800} alt="image" />
              )}
            </div>
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
    </main>
  );
}
