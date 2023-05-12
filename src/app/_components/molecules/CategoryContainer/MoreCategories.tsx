import { CategoryButton } from './CategoryButton';

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
      className="flex flex-wrap items-center gap-2 p-6 card absolute top-32 shadow-md"
      data-cy="category-list-more"
    >
      <CategoryButton
        text="추천"
        onClick={() => onClickCategory(-1)}
        selected={categoryId === -1}
        dataCy={`category_${-1}`}
      />
      <CategoryButton
        text="전체"
        onClick={() => onClickCategory(0)}
        selected={categoryId === 0}
        dataCy={`category_${0}`}
      />
      {subTags?.map((category) => {
        return (
          <CategoryButton
            key={category.id}
            text={category.title}
            onClick={() => onClickCategory(category.id)}
            selected={categoryId === category.id}
            dataCy={`more-category_${category.id}`}
          />
        );
      })}
    </div>
  );
};
