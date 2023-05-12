import { CategoryButton } from './CategoryButton';

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
      <CategoryButton
        id={`categoryButton_-1`}
        text="추천"
        onClick={() => onClickCategory(-1)}
        selected={categoryId === -1}
        dataCy={`category_${-1}`}
      />
      <CategoryButton
        id={`categoryButton_0`}
        text="전체"
        onClick={() => onClickCategory(0)}
        selected={categoryId === 0}
        dataCy={`category_${0}`}
      />
      {subTags?.map((category) => {
        return (
          <CategoryButton
            id={`categoryButton_${category.id}`}
            key={category.id}
            text={category.title}
            onClick={() => onClickCategory(category.id)}
            selected={categoryId === category.id}
            dataCy={`category_${category.id}`}
          />
        );
      })}
    </div>
  );
};
