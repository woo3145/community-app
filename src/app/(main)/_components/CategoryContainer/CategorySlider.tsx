import { SelectButton } from '../../../_components/atoms/SelectButton';

interface Props {
  handleScrollRef: (node: any) => void;
  categoryId: number;
  onClickCategory: (categoryId: number) => void;
  subTags: SubTag[];
}

export const CategorySlider = ({
  handleScrollRef,
  categoryId,
  onClickCategory,
  subTags,
}: Props) => {
  return (
    <div
      className={'flex gap-2 overflow-x-scroll scroll-smooth no-scrollbar'}
      ref={handleScrollRef}
      data-cy="category-list"
    >
      <SelectButton
        id={`categoryButton_-1`}
        text="추천"
        onClick={() => onClickCategory(-1)}
        isSelected={categoryId === -1}
        dataCy={`category_${-1}`}
      />
      <SelectButton
        id={`categoryButton_0`}
        text="전체"
        onClick={() => onClickCategory(0)}
        isSelected={categoryId === 0}
        dataCy={`category_${0}`}
      />
      {subTags?.map((category) => {
        return (
          <SelectButton
            id={`categoryButton_${category.id}`}
            key={category.id}
            text={category.title}
            onClick={() => onClickCategory(category.id)}
            isSelected={categoryId === category.id}
            dataCy={`category_${category.id}`}
          />
        );
      })}
    </div>
  );
};
