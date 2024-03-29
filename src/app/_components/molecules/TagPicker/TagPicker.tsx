'use client';

import { Dispatch, SetStateAction } from 'react';
import { IoAdd } from 'react-icons/io5';
import { TagSelectorModal } from '@/app/_components/modals/TagSelectorModal/TagSelectorModal';
import { useModalVisible } from '@/hooks/useModalVisible';
import { SelectedTag } from './SelectedTag';

interface Props {
  selectedTags: SubTag[];
  setSelectedTags: Dispatch<SetStateAction<SubTag[]>>;
}

export const TagPicker = ({ selectedTags, setSelectedTags }: Props) => {
  const { modalIsOpen, openModal, closeModal } = useModalVisible();

  const onClickExcludeTag = (tagId: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="mb-5">
      <div className="mb-3 font-bold">
        <span className="mr-1 text-gray-600">태그 선택</span>
        <span className="mr-1 text-gray-400">(1~3개)</span>
        <span className="text-red-600">*</span>
      </div>
      <div className="flex">
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 mr-4 border"
          onClick={openModal}
          data-cy={'tag-add-button_1'}
        >
          <IoAdd />
        </button>

        {selectedTags.length === 0 && (
          <button
            type="button"
            className="w-20 h-8 border-[3px] border-dotted border-gray-300 rounded-full"
            onClick={openModal}
            data-cy={'tag-add-button_2'}
          ></button>
        )}

        {modalIsOpen && (
          <TagSelectorModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        )}

        <div
          className="flex flex-wrap items-center gap-2"
          data-cy="selectedTag-container"
        >
          {selectedTags.map((tag, idx) => {
            return (
              <SelectedTag
                key={idx}
                text={tag.title}
                dataCy={`selectedTag_${tag.id}`}
                onClick={() => onClickExcludeTag(tag.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
