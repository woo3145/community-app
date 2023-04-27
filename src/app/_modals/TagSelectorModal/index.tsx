'use client';
import { useTags } from '@/hooks/swr/useTags';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';

import { toast } from 'react-toastify';

import styles from './styles.module.scss';
import { ModalFooter } from '@/app/_components/molecules/ModalFooter';
import { ModalHeader } from '@/app/_components/molecules/ModalHeader';
import { TagList } from './TagList';

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
  closeModal: () => void;
  selectedTags: SubTag[];
  setSelectedTags: Dispatch<SetStateAction<SubTag[]>>;
}

export const TagSelectorModal = ({
  modalIsOpen,
  closeModal,
  selectedTags,
  setSelectedTags,
}: Props) => {
  const { tags } = useTags();

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
        <ModalHeader title="태그 선택" closeModal={closeModal} />

        <div className={styles.body}>
          <p className={styles.message}>
            작성글 주제에 맞는 태그를 선택해주세요. (1~3개)
          </p>
          <TagList
            tags={tags}
            pickedTags={pickedTags}
            onClickPickTag={onClickPickTag}
          />
        </div>

        <ModalFooter text="완료" onClick={onClickSelect} />
      </div>
    </ReactModal>
  );
};
