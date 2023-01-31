interface ICategory {
  id: number;
  name: string;
}

interface IArticle {
  id: number;
  title: string;
  contents: string;
  tags: ICategory[];
  thumbnailUrl?: string;

  like_count: number;
  comment_count: number;

  author: IAuthor;

  createAt: string;
}
