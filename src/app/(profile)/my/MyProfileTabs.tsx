import { Dispatch, SetStateAction } from 'react';
import { ProfileTabItem } from '../ProfileTabItem';
import { MyProfileTabType } from './body/MyProfileBody';

interface Props {
  tab: MyProfileTabType;
  setTab: Dispatch<SetStateAction<MyProfileTabType>>;
}

export const MyProfileTabs = ({ tab, setTab }: Props) => {
  const routes: { text: string; type: MyProfileTabType }[] = [
    { text: '최근본', type: 'recents' },
    { text: '작성글', type: 'posts' },
    { text: '작성댓글', type: 'comments' },
    { text: '좋아요', type: 'likes' },
  ];
  return (
    <div className="p-7 pb-0 border-b border-solid border-gray-200">
      <div className="flex space-x-2.5">
        {routes.map((route, idx) => {
          return (
            <ProfileTabItem
              key={idx}
              text={route.text}
              onClick={() => setTab(route.type)}
              isSelected={route.type === tab}
            />
          );
        })}
      </div>
    </div>
  );
};
