import { Dispatch, SetStateAction } from 'react';

import { MyCommunityTabType } from '..';

interface Props {
  tab: MyCommunityTabType;
  setTab: Dispatch<SetStateAction<MyCommunityTabType>>;
}

export const MyCommunityTab = ({ tab, setTab }: Props) => {
  const tabs: { text: string; type: MyCommunityTabType }[] = [
    { text: '최근본', type: 'recents' },
    { text: '작성글', type: 'posts' },
    { text: '작성댓글', type: 'comments' },
    { text: '좋아요', type: 'likes' },
  ];
  return (
    <div className="p-7 pb-0 border-b border-solid border-gray-200">
      <div className="flex">
        {tabs.map((t, idx) => {
          return (
            <div
              key={idx}
              className={`mr-5 pb-2 cursor-pointer text-gray-500 ${
                tab === t.type &&
                'border-b-2 border-solid border-primary text-primary font-bold'
              }`}
              onClick={() => setTab(t.type)}
            >
              {t.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
