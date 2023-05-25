.env

```
NEXT_PUBLIC_APP_URL=app_url:port
NEXTAUTH_URL=nextAuth 리다이렉션 url

DATABASE_URL="postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"

NEXTAUTH_SECRET=tasetaseeeee

JWT_ACCESS_TOKEN_EXPIRATION=15 // minutes
JWT_REFRESH_TOKEN_EXPIRATION=7 // days

// AWS-S3 관련
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
AWS_S3_BUCKET=


```

### todos

- [x] Next-Auth 인증

  - [x] Jwt 로직 작성 ( 현재 Providers: [Credentials] )
    - [x] 첫 로그인 시 토큰발행
    - [x] accessToken 만료 시 refresh
  - [x] Custom Credentials 인증

- [x] 글 관련

  - [x] DB Schema 설계
  - [x] API
    - [x] Create
    - [x] Read
    - [x] Update
    - [x] Delete
  - [x] 글 작성 로직
  - [x] 이미지 업로드 기능 (하나의 이미지, 썸네일로 설정됨)
  - [x] 태그 picker 컴포넌트
  - [x] 좋아요 기능
  - [x] 댓글 기능
    - [x] API
    - [x] 댓글 컴포넌트

- [x] 게시글 로드

  - [x] 전체
    - [x] 무한 스크롤링
    - [x] 태그필터
  - [x] 한개
    - [x] 댓글

- [x] 프로필 관련

  - [x] 프로필 페이지
  - [x] 마이 페이지
  - [x] 마이 페이지 이미지 업로드
  - [x] 닉네임 기능 (체크 시 가입된 이름 대신 닉네임 사용)

- 마이페이지

  - [x] 최근 본 글
  - [x] 좋아요 한 글

- 그외

  - [x] 로딩 컴포넌트 적용
    - [x] react-loading-skeleton으로 교체
  - [x] react-toastify
  - [x] 댓글 삭제 기능
  - [x] useSWR 변경 데이터 즉시 반영
  - [x] SSR 로딩화면 필요 (post detail)

  - [x] ~~현재 head.tsx에서 api요청을 하면 loading.tsx가 작동을 안함~~

    1. next 13.2 부터 head.tsx 방식이 삭제된 듯 하여 버전 업그레이드 필요 (현재 문제 버전 13.1.5) : head.tsx -> metadata/generateMetadata
    2. generateMetadata에서 api 요청시 loading.tsx파일을 무시함 (현재 문제 버전 13.3.4)
       - 시행착오 : Route events의 routeChangeStart로 해결해 보려했지만 routeChangeComplete가 AppRouter에서 아직 지원하지않아 라우팅 완료시점을 구할 수 없음
         **참고 https://beta.nextjs.org/docs/api-reference/use-router#router-events**

    - [x] 해결: 현재 nextjs 13.4 이상부터 App Router가 안정적인 버전으로 변경 되어 loading 파일과 generateMetadata를 함께써도 정상 작동함
          첫 렌더링 때 generateMetadata와 loading컴포넌트로 document를 만들어 보내주고 page 컴포넌트를 lazy 렌더링 시킴(헤더만 ssr시켜 SEO문제 없음)
          **참고 https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming**

  - [x] pages/api -> app/api로 마이그레이션

  - [x] nextjs가 app directory로 전환되면서 CSS Module이 너무 지저분함 & 불러오는 css파일이 너무많음 -> tailwind css로 마이그레이션

  - [ ] E2E Test

    - [x] 메인 (db reset/seed 후 태그 확인)
    - [x] 회원가입
    - [x] 로그인
    - [x] 글쓰기
    - [x] 댓글달기/삭제
    - [x] 프로필 변경
      - [x] 이미지 크롭

  - 에러 발견
  - [x] Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './server.edge' is not defined by "exports" in ....
        nextjs 13.4.1 업데이트 후 발생 -> 에러 추적중 https://github.com/vercel/next.js/issues/49169
  - [ ] nextjs 13.4 의 serverActions 활성화 시 metadata 작동안함 (아직 적용하기 이른듯)
        정보가 없어서 next.js에 issue 생성 https://github.com/vercel/next.js/issues/49650
        canary 업데이트 후 재이슈 생성 https://github.com/vercel/next.js/issues/49679

  - [ ] NextAuth 문제 (app directory에선 refresh 토큰 방식 사용불가) -> 수정 필요
    - nextJS 13의 app directory(서버컴포넌트)는 요청쿠키의 읽기만 가능하기 때문에 완전한 CSR 페이지가 아니면 쿠키를 변경하지 못해 리프레시가 작동하지 않는다 😿
      // 참고 https://next-auth.js.org/configuration/nextjs#middleware
      공식문서에 의하면 위와 같은 문제로 30days로 쿠키가 보내지고 해당 쿠키가 삭제되면 다시 로그인 해야한다고 안내하고있다.
      - 뭘보내도 app directory에서 라우팅을 한다면 [...nextauth].ts에서 설정한 maxage값으로 보내진 쿠키로만 검증을 하기 때문에 refresh를 할 수 없다.(읽기전용 데이터는 보낼 수 있음)
        ++ next의 신기능인 serverActions와 RouteHandler에서는 쿠키를 쓸 수 있음으로 추후에는 가능하게 될 것 같다.

에러처리

- 백엔드 : 에러상황 시 Custom Error 객체를 반환하고 에러처리 핸들러로 감싸 errors 반환 값을 {message, field?}[] 로 통일하여 응답
- 프론트 : fetchApi(fetch helper)에서 응답코드를 확인하고 200번대 응답이 아니면 statusCode를 포함하여 errors를 throw 시킴
  - useSWR : 글로벌에서 fetch helper로 에러 throw
  - useInfiniteScrollSWR : 에러시 상태코드가 404인지 확인하여 재요청 안함
  - 클라이언트 에러는 new Error()객체를 사용
  - try catch단에서 타입가드로 백엔드/클라이언트 에러 구별 후 처리 (errorHandlerWithToast)

💼 폴더 구조 정리

- app

  - \_components

    - Atoms - 최소단위 컴포넌트(ex. Button)
    - Molecules - UI만 가진 컴포넌트(ex. PostCard)
    - Modals - 모달
    - Forms - post요청을 보내는 컴포넌트

  - (page)
    - \_components - 레이아웃을 구성하는 컴포넌트 (ex. postList, categorySlider)
    - layout.tsx - 공동된 레이아웃, redirect, metadata
    - page.tsx - 레이아웃, redirect, metadata
    - error.tsx - page에 ErrorBoundary를 씌움
    - loading.tsx - page에 Suspense를 씌움

- pages (serverActions 기능 안정화 될때 까지 사용)

  - api - api 레이어

- interfaces - 타입들

- hooks

  - scrollSwr - useSWRInfinite를 이용한 무한 스크롤기능이 포함 된 Data Fetcher hook
  - swr - useSWR을 사용하는 Data Fetcher hook
  - ... - 비즈니스 로직 hooks

- libs - 헬퍼 함수
