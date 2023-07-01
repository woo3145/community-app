import { SelectButton } from '../../../_components/atoms/SelectButton';

interface Props {
  categoryId: number;
  onClickCategory: (categoryId: number) => void;
  subTags: SubTag[];
}

export const MoreCategories = ({
  categoryId,
  onClickCategory,
  subTags,
}: Props) => {
  return (
    <div
      className="absolute flex-wrap items-center hidden gap-2 p-6 shadow-md card xl:flex"
      data-cy="category-list-more"
    >
      <SelectButton
        text="추천"
        onClick={() => onClickCategory(-1)}
        isSelected={categoryId === -1}
        dataCy={`category_${-1}`}
      />
      <SelectButton
        text="전체"
        onClick={() => onClickCategory(0)}
        isSelected={categoryId === 0}
        dataCy={`category_${0}`}
      />
      {subTags?.map((category) => {
        return (
          <SelectButton
            key={category.id}
            text={category.title}
            onClick={() => onClickCategory(category.id)}
            isSelected={categoryId === category.id}
            dataCy={`more-category_${category.id}`}
          />
        );
      })}
    </div>
  );
};
