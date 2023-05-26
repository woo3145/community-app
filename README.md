# 원티드 커뮤니티 클론

## 배포 주소

https://community-app-sigma.vercel.app

## 프로젝트 소개

[원티드 커뮤니티](https://www.wanted.co.kr/community) 클론 앱 입니다.

## ⛏️ Built With

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 🚀 Deployment

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## ⚙️ Testing

![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

### ENV

```

// 앱의 URL
NEXT_PUBLIC_APP_URL=app_url:port

// nextAuth의 요청 url
NEXTAUTH_URL=app_url:port

// db url
DATABASE_URL="postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"

// nextAuth의 jwt 암호화 키
NEXTAUTH_SECRET=tasetaseeeee

// jwt 토큰 지속시간(days)
JWT_ACCESS_TOKEN_EXPIRATION=30

// 간편 로그인 관련
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

// AWS-S3 관련
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

```

## 주요 기능

- 인증
  - email & password 로그인
  - 구글 간편 로그인
- 프로필

  - 프로필 수정
  - 프로필 이미지 크롭
  - 닉네임 설정 여부
  - 최근 본 글
  - 작성한 글
  - 작성한 댓글
  - 좋아요한 글

- 커뮤니티

  - 글쓰기
  - 이미지 업로드
  - 좋아요
  - 댓글 추가, 삭제

- 개선

  - [x] 로딩 컴포넌트 적용(react-loading-skeleton)
  - [x] toast메세지 적용 (react-toastify)
  - [x] 데이터 수정 작업시 useSWR 즉시 반영(mutate 캐시 수정)
    - useSWR을 사용하는 훅에서 updateCache 함수를 생성하여 데이터 수정 관련 요청 후 실행
  - [x] SSR 페이지(게시글 상세) loading 화면 추가 (SEO 문제 없도록)

    - 이유: 게시글 작성 후 ssr로딩에 시간이 걸리기 때문에 페이지 이동 전 현재 페이지에서 멈춤
    - 문제: [x] ~~현재 head.tsx에서 api요청을 하면 loading.tsx가 작동을 안함~~

      1. next 13.2 부터 head.tsx 방식이 삭제된 듯 하여 버전 업그레이드 시도 (현재 문제 버전 13.1.5) : head.tsx -> metadata/generateMetadata

      2. generateMetadata에서 api 요청시 loading.tsx파일을 무시함 (현재 문제 버전 13.3.4)

      - 시행착오 : Route events의 routeChangeStart로 해결해 보려했지만 routeChangeComplete가 AppRouter에서 아직 지원하지않아 라우팅 완료시점을 구할 수 없음
        **참고 https://beta.nextjs.org/docs/api-reference/use-router#router-events**

      - [x] 해결: 현재 nextjs 13.4 이상부터 App Router가 안정적인 버전으로 변경 되어 loading 파일과 generateMetadata를 함께써도 정상 작동함
            첫 렌더링 때 generateMetadata와 loading컴포넌트로 document를 만들어 보내주고 page 컴포넌트를 lazy 렌더링 시킴(헤더만 ssr시켜 SEO문제 없음)
            **참고 https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#seo**

  - [x] 이미지 placeholder 단색 blur 추가

  ### E2E Testing

  - [x] 메인 (db reset/seed 후 태그 확인)
  - [x] 회원가입
  - [x] 로그인
  - [x] 글쓰기
  - [x] 댓글달기/삭제
  - [x] 프로필 변경
    - [x] 이미지 크롭

### NextJS 13.4.3 에러 모음

- [ ] Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './server.edge' is not defined by "exports" in ....
      nextjs 13.4.1 업데이트 후 발생 -> 에러 추적중 https://github.com/vercel/next.js/issues/49169

- [ ] nextjs 13.4 의 serverActions 활성화 시 metadata 작동안함 (아직 적용하기 이른듯)
      정보가 없어서 next.js에 issue 생성 https://github.com/vercel/next.js/issues/49650
      canary 업데이트 후 재이슈 생성 https://github.com/vercel/next.js/issues/49679

- [ ] NextAuth 문제 (app directory에선 refresh 토큰 방식 사용불가)

  - nextJS 13의 app directory(서버컴포넌트)는 요청쿠키의 읽기만 가능하기 때문에 리프레시가 작동하지 않는다 😿
    // 참고 https://next-auth.js.org/configuration/nextjs#middleware
    공식문서에 의하면 위와 같은 문제로 30days로 쿠키가 보내지고 해당 쿠키가 삭제되면 다시 로그인 해야한다고 안내하고있다.

    - getServerSession의 내부코드를 살펴보면

    1. app/ : 서버 컴포넌트에서 getServerSession(authOptions) 호출
       pages/ : getServerSideProps()에서 getServerSession(req,res,authOption) 호출
    2. next/headers의 cookies를 가져와서 쿠키를 읽음
    3. authOptions의 jwt callback에서 리프레시 토큰 발급받아 새 쿠키를 리턴함
    4. res.setHeader를 이용해 받아온 쿠키를 수정함
       ㄴ 여기서 app/ 에서는 res를 넘겨주는 방법이 없기 때문에 쿠키를 수정할 수 없음
       ㄴ (getServerSession은 서버컴포넌트에서 실행되어 리프레시 토큰을 받아와 클라이언트에게 응답을 주기전에 수정하도록 설계되어있음)
    5. 즉 pages/ 에선 getServerSideProps()가 미들웨어처럼 구현되어 있어서 중간에 응답 수정이 가능했지만 app/ 에선 컴포넌트 자체가 서버 컴포넌트라 수정이 불가함

    - 따라서 현재 next의 app/ 의 서버 컴포넌트에선 pages/처럼 api요청시 클라이언트의 쿠키를 수정할 방법이 없다.

### 💼 디렉토리 구조

```
ㄴ app
  ㄴ _components
    ㄴ Atoms : 최소단위 컴포넌트(ex. Button)
    ㄴ Molecules : UI만 가진 컴포넌트(ex. PostCard)
    ㄴ Modals : 모달
    ㄴ Forms : post요청을 보내는 컴포넌트
  ㄴ _providers : 프레임워크의 Providers 모음 폴더
  ㄴ (page)
    ㄴ _components - 레이아웃을 구성하는 컴포넌트 (ex. postList, categorySlider)
    ㄴ layout.tsx - 공동된 레이아웃, redirect, metadata
    ㄴ page.tsx - 레이아웃, redirect, metadata
    ㄴ error.tsx - page에 ErrorBoundary를 씌움
    ㄴ loading.tsx - page에 Suspense를 씌움
  ㄴ api : next 13.2 버전에서 추가된 api 라우터
ㄴ pages
  ㄴ api : next 13.2 이전의 api 레이어
ㄴ interfaces - 타입들
ㄴ hooks
  ㄴ scrollSwr : useSWRInfinite를 이용한 무한 스크롤기능이 포함 된 Data Fetcher hook
  ㄴ swr : useSWR을 사용하는 Data Fetcher hook
  ㄴ ... : 비즈니스 로직 hooks
ㄴ libs
  ㄴ client : 클라이언트에서 쓰이는 함수 폴더
  ㄴ prisma : prismaClient와 관련 helper 폴더
  ㄴ server : api에서 쓰이는 함수 폴더
    ㄴ auth.ts : nextAuth의 option 파일
    ㄴ multer.ts : aws-s3 업로드 multer
  ...
```
