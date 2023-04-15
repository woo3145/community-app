'use client';
import { useTags } from '@/hooks/swr/useTags';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';

import styles from './tag_selector_modal.module.scss';
import { toast } from 'react-toastify';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedTags: SubTag[];
  setSelectedTags: Dispatch<SetStateAction<SubTag[]>>;
}

export const TagSelectorModal = ({
  modalIsOpen,
  setIsOpen,
  selectedTags,
  setSelectedTags,
}: Props) => {
  const { tags } = useTags();
  function closeModal() {
    setIsOpen(false);
  }
  const [pickedTags, setPickedTags] = useState<SubTag[]>(selectedTags);

  const onClickPickTag = (tag: SubTag) => {
    if (pickedTags.includes(tag)) {
      setPickedTags(pickedTags.filter((t) => t.id !== tag.id));
      return;
    }

    if (3 <= pickedTags.length) {
      toast.error('최대 3개만 선택 가능합니다.');
      return;
    }
    setPickedTags([...pickedTags, tag]);
  };

  const onClickSelect = () => {
    setSelectedTags(pickedTags);
    closeModal();
  };
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>태그 선택</h2>
          <span className={styles.titleBadge}>0</span>
          <button onClick={closeModal} className={styles.closeButton}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.message}>
            작성글 주제에 맞는 태그를 선택해주세요. (1~3개)
          </p>
          <ul>
            {tags.map((tag, idx) => {
              return (
                <li key={idx}>
                  <div className={styles.tagTitle}>
                    <span>{tag.icon}</span> {tag.title}
                  </div>
                  <ul className={styles.subTagList}>
                    {tag.subTags.map((subTag, idx) => {
                      return (
                        <li
                          className={
                            pickedTags.find((t) => t.id === subTag.id)
                              ? styles.selected
                              : ''
                          }
                          key={idx}
                          onClick={() => onClickPickTag(subTag)}
                        >
                          {subTag.title}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.bottom}>
          <button className={styles.submitButton} onClick={onClickSelect}>
            완료
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
