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

- 그외
  - [ ] 로딩 컴포넌트 적용
  - [ ] 이번 주 많이 본 글 기능
  - [ ] react-toastify
