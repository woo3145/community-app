import { Dispatch, SetStateAction } from 'react';
import { UserProfileTabType } from './UserProfileBody';
import { ProfileTabItem } from '../../../../_components/atoms/ProfileTabItem';

interface Props {
  tab: UserProfileTabType;
  setTab: Dispatch<SetStateAction<UserProfileTabType>>;
}

export const UserProfileTabs = ({ tab, setTab }: Props) => {
  const tabs: { text: string; type: UserProfileTabType }[] = [
    { text: '작성글', type: 'posts' },
    { text: '작성댓글', type: 'comments' },
  ];
  return (
    <div className="pb-0 border-b border-gray-200 border-solid p-7">
      <div className="flex space-x-4">
        {tabs.map((item, idx) => {
          return (
            <ProfileTabItem
              key={idx}
              text={item.text}
              onClick={() => setTab(item.type)}
              isSelected={item.type === tab}
            />
          );
        })}
      </div>
    </div>
  );
};
