import { IoEllipsisHorizontal } from 'react-icons/io5';
import { useEffect, useRef } from 'react';
import { useModalVisible } from '@/hooks/useModalVisible';
import ConfirmModal from '@/app/_components/modals/confirm/ConfirmModal';
import { useDeletePost } from '@/hooks/useDeletePost';
import { PostWithIsLikedAndIsCommented } from '@/interfaces/post';
import { useRouter } from 'next/navigation';

export const PostPopup = ({
  post,
  dataCy,
}: {
  post: PostWithIsLikedAndIsCommented;
  dataCy?: string;
}) => {
  const router = useRouter();
  const popupRef = useRef<HTMLUListElement>(null);
  const {
    modalIsOpen: popupIsOpen,
    toggleModal: togglePopup,
    closeModal: closePopup,
  } = useModalVisible(); // 팝업 메뉴

  // Delete Post
  const {
    modalIsOpen: deleteModalIsOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModalVisible(); // deletePost 모달

  const closeDeleteModalAndRedirect = () => {
    closeDeleteModal();
    router.push('/');
  };
  const { onClick: onDelete, isLoading: onDeleteLoading } = useDeletePost(
    post.id,
    closeDeleteModalAndRedirect
  );

  // 팝업 메뉴 이외 클릭 시 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    if (popupIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePopup, popupIsOpen]);

  return (
    <div>
      <IoEllipsisHorizontal
        onClick={togglePopup}
        className="cursor-pointer"
        data-cy={`${dataCy}-popup-openButton`}
      />
      {popupIsOpen && (
        <ul
          ref={popupRef}
          className="absolute z-30 bg-white border border-gray-200 border-solid rounded-md -right-2"
        >
          <li
            onClick={openDeleteModal}
            className="px-5 py-1 text-sm text-red-600 border-b cursor-pointer hover:bg-gray-100"
            data-cy={`${dataCy}-popup-deleteButton`}
          >
            삭제하기
          </li>
        </ul>
      )}
      {deleteModalIsOpen && (
        <ConfirmModal
          message="게시글을 삭제하시겠습니까?"
          closeModal={closeDeleteModal}
          isLoading={onDeleteLoading}
          onSubmit={onDelete}
        />
      )}
    </div>
  );
};
