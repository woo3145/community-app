.env

```
NEXT_PUBLIC_APP_URL=app_url:port

DATABASE_URL="postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"

JWT_TOKEN_SECRET=tasetaseeeee

JWT_ACCESS_TOKEN_EXPIRATION=15 // minutes
JWT_REFRESH_TOKEN_EXPIRATION=7 // days

ADMIN_ID=aa12a1e123a123 // ADMIN API를 사용할 수 있는 user id

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

      - 문제 추측 : loading.tsx에서도 head.tsx를 공유하기 때문에
      - 생각 : [x] next 13.2 부터 head.tsx 방식이 삭제된 듯 하여 버전 업그레이드 필요 (현재 문제 버전 13.1.5)
      - 결과 : 업그레이드 해도 loading 파일은 page 파일의 document를 받아온뒤 로드되는 방식이라 헤더에서 api요청을 하면 똑같음
        - 1. **SSR page** : SSR 적용 됨
        - 2. **SSR page + loading** : loading파일이 있으면 page가 Suspense로 감싸져 page를 대체하는 방식으로 작동되어 **CSR이 되어버림**
        - 3. **SSR page + loading + generateMetadata** : nextjs에서 **같은 api요청은 자동 중복 제거**되기 때문에 loading 컴포넌트 렌더링이 안되서 SSR 적용 됨
          - Suspense로 감싸져 있어도 page에서 document를 불러올때 metadata에서 api 응답이 캐시되기 때문에 pending상태가 되지 않음 (loading 컴포넌트가 있으나 마나)
      - 생각 : [x] global layout에서 post/[post_id]로의 라우터 변경 시작과 완료를 감지한 후 global layout에서 loading 컴포넌트를 보여줘야 할듯함
      - 시행착오1 : Link의 query로 게시물 데이터를 보내고 head에서 query 유무에 따라 metadata에서 api로드 -> 결과를 보니 위의 2번(CSR)과 3번(SSR)경우가 섞이게 됨
      - 시행착오2 : Route events의 routeChangeStart로 해결해 보려했지만 nextjs 13에서는 아직 지원하지 않음
        **참고 https://beta.nextjs.org/docs/api-reference/use-router#router-events**

      - [ ] : routeChangeStart는 hook으로 어느정도 구현가능해도 routeChangeComplete는 구현방법이 떠오르지 않아서 지원을 기다려야할듯함

  - [ ] E2E Test
    - [x] 메인 (db reset/seed 후 태그 확인)
    - [x] 회원가입
    - [ ] 로그인
    - [ ] 글쓰기
    - [ ] 댓글달기/삭제
    - [ ] 프로필 변경

에러처리

- 백엔드 : 에러상황 시 Custom Error 객체를 반환하고 에러처리 핸들러로 감싸 errors 반환 값을 {message, field?}[] 로 통일하여 응답
- 프론트 : fetchApi(fetch helper)에서 응답코드를 확인하고 200번대 응답이 아니면 statusCode를 포함하여 errors를 throw 시킴
  - useSWR : 글로벌에서 fetch helper로 에러 throw
  - useInfiniteScrollSWR : 에러시 상태코드가 404인지 확인하여 재요청 안함
  - 클라이언트 에러는 new Error()객체를 사용
  - try catch단에서 타입가드로 백엔드/클라이언트 에러 구별 후 처리 (errorHandlerWithToast)
