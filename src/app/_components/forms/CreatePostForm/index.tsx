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
      <div className="fixed left-0 top-14 py-2.5 w-full bg-white border-b border-solid border-gray-200 z-20">
        <div className="w-full max-w-screen-lg mx-auto flex justify-end">
          <Button
            type="submit"
            text="등록하기"
            isValid={!isApiLoading && isValid}
            dataCy="submit-button"
          />
        </div>
      </div>
      <div className="w-full max-w-screen-lg card mx-auto p-20">
        {/* 태그 */}
        <TagPicker
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        {/* 제목 */}
        <div className="pb-4 border-b-2 border-solid border-gray-200">
          <input
            {...register('title', { required: true })}
            type="text"
            placeholder="제목을 입력해주세요."
            data-cy={'title-input'}
            className="text-2xl font-bold w-full"
          />
        </div>
        {/* 내용 */}
        <div className="relative pt-8 w-full h-auto">
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
            className="text-lg w-full h-10 border-none overflow-y-hidden z-0 resize-none"
          ></textarea>
          <textarea
            className={'text-lg w-full h-10 absolute left-0 top-0 invisible'}
            ref={hiddenTextareaRef}
          ></textarea>

          {/* 이미지 */}
          {preview && (
            <div className="relative mt-4">
              <button
                onClick={resetImage}
                className="absolute right-2.5 top-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-gray-600 text-white"
              >
                <IoClose />
              </button>

              <Image
                src={preview}
                width={800}
                height={800}
                alt="image"
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* 이미지 추가 버튼 */}
      <div className="flex flex-col justify-end items-end fixed top-0 left-0 right-0 py-20 mx-auto w-full h-screen max-w-screen-lg pointer-events-none">
        <div className="relative text-xs py-1 px-3 mb-2 bg-primary text-white rounded-md font-bold">
          <span>사진을 추가해 보세요!</span>
          <div className={''}></div>
        </div>
        <label
          htmlFor="input-image"
          className="flex flex-col justify-center items-center w-14 h-14 bg-white border border-solid border-gray-200 rounded-full pointer-events-auto cursor-pointer"
        >
          <IoImageOutline className="w-6 h-6" />
          <span className="text-xs">
            (<em className="text-primary">0</em>/1)
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
