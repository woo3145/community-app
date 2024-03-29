import { Tag } from '.prisma/client';

export const DEFAULT_TAG: Tag[] = [
  {
    id: 1,
    title: '직장인 공감',
    icon: '💼',
    parentId: null,
  },
  {
    id: 2,
    title: '관심분야',
    icon: '🌈',
    parentId: null,
  },
  {
    id: 3,
    title: '트렌드/인사이트',
    icon: '🚀',
    parentId: null,
  },
  {
    id: 4,
    title: '커리어고민',
    icon: null,
    parentId: 1,
  },
  {
    id: 5,
    title: '취업/이직',
    icon: null,
    parentId: 1,
  },
  {
    id: 6,
    title: '회사생활',
    icon: null,
    parentId: 1,
  },
  {
    id: 7,
    title: '인간관계',
    icon: null,
    parentId: 1,
  },
  {
    id: 8,
    title: '개발',
    icon: null,
    parentId: 2,
  },
  {
    id: 9,
    title: '데이터',
    icon: null,
    parentId: 2,
  },
  {
    id: 10,
    title: 'HR',
    icon: null,
    parentId: 2,
  },
  {
    id: 11,
    title: '서비스기획',
    icon: null,
    parentId: 2,
  },
  {
    id: 12,
    title: '마케팅',
    icon: null,
    parentId: 2,
  },
  {
    id: 13,
    title: '디자인',
    icon: null,
    parentId: 2,
  },
  {
    id: 14,
    title: '경영/전략',
    icon: null,
    parentId: 2,
  },
  {
    id: 15,
    title: 'CS/CX',
    icon: null,
    parentId: 2,
  },
  {
    id: 16,
    title: 'MD',
    icon: null,
    parentId: 2,
  },
  {
    id: 17,
    title: '콘텐츠 제작',
    icon: null,
    parentId: 2,
  },
  {
    id: 18,
    title: 'QA',
    icon: null,
    parentId: 2,
  },
  {
    id: 19,
    title: 'IT/기술',
    icon: null,
    parentId: 3,
  },
  {
    id: 20,
    title: '브랜딩',
    icon: null,
    parentId: 3,
  },
  {
    id: 21,
    title: '라이프스타일',
    icon: null,
    parentId: 3,
  },
  {
    id: 22,
    title: 'UX/UI',
    icon: null,
    parentId: 3,
  },
];
