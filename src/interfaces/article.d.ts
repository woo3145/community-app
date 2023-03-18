interface Article {
  id: number;
  title: string;
  content: string;
  tags: ChildTag[];
  imageUrl?: string;

  userId?: string;

  createAt: string;
  updateAt: string;

  _count: {
    comments: number;
    likes: number;
  };
}

interface IComment {
  id: number;
  content: string;

  userId?: string;

  createAt: string;
  updateAt: string;
}
