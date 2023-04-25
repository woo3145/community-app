.env

```
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
  - [x] react-toastify
  - [x] 댓글 삭제 기능

에러처리

- 백엔드 : 에러상황 시 Custom Error 객체를 반환하고 에러처리 핸들러로 감싸 errors 반환 값을 {message, field?}[] 로 통일하여 응답
- 프론트 : fetchApi(fetch helper)에서 응답코드를 확인하고 200번대 응답이 아니면 statusCode를 포함하여 errors를 throw 시킴
  - useSWR : 글로벌에서 fetch helper로 에러 throw
  - useInfiniteScrollSWR : 에러시 상태코드가 404인지 확인하여 재요청 안함
  - 클라이언트 에러는 new Error()객체를 사용
  - try catch단에서 타입가드로 백엔드/클라이언트 에러 구별 후 처리 (errorHandlerWithToast)
