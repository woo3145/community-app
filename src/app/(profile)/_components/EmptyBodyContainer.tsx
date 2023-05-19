import Link from 'next/link';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { BsPencil, BsSearch } from 'react-icons/bs';

export const EmptyMyPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BsPencil className="mb-3 text-6xl text-primary" />
      <div className="py-4 text-center">
        <p className="text-sm text-gray-500">아직 작성하신 글이 없어요.</p>
        <p className="text-sm text-gray-500">첫 글 쓰러 가볼까요?</p>
      </div>
      <Link
        href="/write"
        className="px-8 py-1.5 border border-solid rounded-full border-primary text-primary font-semibold"
      >
        첫 글 쓰러가기
      </Link>
    </div>
  );
};
export const EmptyMyComments = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <IoChatbubbleOutline className="mb-3 text-6xl text-primary" />
      <div className="py-4 text-center">
        <p className="text-sm text-gray-500">아직 작성하신 댓글이 없어요.</p>
        <p className="text-sm text-gray-500">
          댓글 달 만한 글이 있는지 보러 갈까요?
        </p>
      </div>
      <Link
        href="/"
        className="px-8 py-1.5 border border-solid rounded-full border-primary text-primary font-semibold"
      >
        커뮤니티 구경하기
      </Link>
    </div>
  );
};

export const EmptyMyLikes = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BsSearch className="mb-3 text-6xl text-primary" />
      <div className="py-4 text-center">
        <p className="text-sm text-gray-500">아직 좋아요 표시한 글이 없어요.</p>
        <p className="text-sm text-gray-500">게시글 구경하러 가볼까요?</p>
      </div>
      <Link
        href="/"
        className="px-8 py-1.5 border border-solid rounded-full border-primary text-primary font-semibold"
      >
        커뮤니티 구경하기
      </Link>
    </div>
  );
};

export const EmptyMyRecents = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BsSearch className="mb-3 text-6xl text-primary" />
      <div className="py-4 text-center">
        <p className="text-sm text-gray-500">아직 읽은 글이 없어요.</p>
        <p className="text-sm text-gray-500">게시글 구경하러 가볼까요?</p>
      </div>
      <Link
        href="/"
        className="px-8 py-1.5 border border-solid rounded-full border-primary text-primary font-semibold"
      >
        커뮤니티 구경하기
      </Link>
    </div>
  );
};

export const EmptyUserPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BsPencil className="mb-3 text-6xl text-primary" />
      <div className="py-4 text-center">
        <p className="text-sm text-gray-500">아직 작성한 글이 없어요.</p>
      </div>
    </div>
  );
};

export const EmptyUserComments = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <IoChatbubbleOutline className="mb-3 text-6xl text-primary" />
      <div className="py-4 text-center">
        <p className="text-sm text-gray-500">아직 작성한 댓글이 없어요.</p>
      </div>
    </div>
  );
};
