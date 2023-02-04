export const mockArticles: IArticle[] = [
  {
    id: 1,
    title: '제목',
    contents: '내용',
    tags: [
      {
        id: 1,
        name: '개발',
      },
    ],
    like_count: 0,
    comment_count: 0,
    author: {
      id: 1,
      name: 'woo3145',
      job: '개발',
      career: '신입',
    },
    createAt: '8시간 전',
  },
  {
    id: 2,
    title: '제목22',
    contents: '내용22',
    tags: [
      {
        id: 1,
        name: '개발',
      },
    ],
    like_count: 4,
    comment_count: 4,
    author: {
      id: 2,
      name: 'woo31456',
      job: '개발',
      career: '신입',
    },
    createAt: '2023.01.27',
  },
];
