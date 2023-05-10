'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { IoAdd, IoCloseOutline } from 'react-icons/io5';

import styles from './styles.module.scss';
import { TagSelectorModal } from '@/app/_modals/TagSelectorModal';
import { useModalVisible } from '@/hooks/useModalVisible';

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
    <div className={styles.container}>
      <div className={styles.header}>
        <span>태그 선택</span>
        <span>(1~3개)</span>
        <span>*</span>
      </div>
      <div className={styles.body}>
        <button
          type="button"
          className={styles.addButton}
          onClick={openModal}
          data-cy={'tag-add-button_1'}
        >
          <IoAdd />
        </button>

        {selectedTags.length === 0 && (
          <button
            type="button"
            className={styles.placeholder}
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

        <div className={styles.selectedTagList} data-cy="selectedTag-container">
          {selectedTags.map((tag, idx) => {
            return (
              <div
                key={idx}
                className={styles.selectedTag}
                data-cy={`selectedTag_${tag.id}`}
              >
                <span>{tag.title}</span>
                <button
                  type="button"
                  onClick={() => onClickExcludeTag(tag.id)}
                  data-cy={`selectedTag_${tag.id}-remove-button`}
                >
                  <IoCloseOutline />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
