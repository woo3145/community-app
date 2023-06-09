'use client';
import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import { PostCommentButton } from '../CommentButton';
import { PostLikeButton } from '../PostLikeButton';
import { useModalVisible } from '@/hooks/useModalVisible';
import { useEffect } from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { DeletePostConfirmModal } from '@/app/_components/modals/confirm/DeletePostConfirmModal';
import { useSession } from 'next-auth/react';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostActionContainer = ({ post }: Props) => {
  const { data: session } = useSession();
  const {
    modalIsOpen: popupIsOpen,
    toggleModal: togglePopup,
    closeModal: closePopup,
  } = useModalVisible(); // 팝업
  const { modalIsOpen, openModal, closeModal } = useModalVisible(); // deleteComment 모달

  useEffect(() => {
    if (!popupIsOpen) return;
    document.addEventListener('click', closePopup);

    return () => {
      document.removeEventListener('click', closePopup);
    };
  }, [closePopup, popupIsOpen]);

  const isWriter = session && session.user.id === post.userId;

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-14">
        {/* Like Button */}
        <PostLikeButton
          postId={post.id}
          isLiked={post.isLiked}
          likeCount={post._count.likes}
        />
        {/* Comment Button */}
        <PostCommentButton
          postId={post.id}
          isCommented={post.isCommented}
          commentCount={post._count.comments}
        />
      </div>

      {isWriter && (
        <div>
          <IoEllipsisHorizontal
            onClick={togglePopup}
            className="cursor-pointer"
          />
          {popupIsOpen && (
            <div>
              <div className="absolute z-30 px-5 py-2 bg-white border border-gray-200 border-solid rounded-md -right-2">
                <div
                  onClick={openModal}
                  className="text-sm text-red-600 cursor-pointer"
                >
                  삭제하기
                </div>
              </div>
            </div>
          )}
          <DeletePostConfirmModal
            postId={post.id}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};
