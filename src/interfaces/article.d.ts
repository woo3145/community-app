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

  userId?: string;

  createAt: string;
  updateAt: string;
}

interface IComment {
  id: number;
  content: string;

  userId?: string;

  createAt: string;
  updateAt: string;
}
