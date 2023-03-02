interface ITag {
  id: number;
  title: string;
}

interface IArticle {
  id: number;
  title: string;
  content: string;
  tags: ITag[];
  imageUrl?: string;

  likeCount: number;
  commentCount: number;

  user?: IAuthor;

  createAt: string;
  updateAt: string;
}
