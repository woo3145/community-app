describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  const testUser = {
    name: 'testUser',
    email: 'test@test.test',
    password: 'qwer1234!',
    wrongPassword: 'qwer1234',
  };

  it('가입된 이메일을 입력하면 이메일 로그인 페이지가 나타남', () => {
    cy.dataCy('email-input').type(testUser.email); // 가입된 이메일 입력
    cy.dataCy('continue-button').click();

    // 이메일 로그인 컴포넌트 확인
    cy.dataCy('login-container').should('not.exist');
    cy.dataCy('signup-container').should('not.exist');
    cy.dataCy('emailLogin-container').should('exist');

    // 이전으로 이동 && email field가 초기화 되었는지
    cy.dataCy('prev-button').click();
    cy.dataCy('login-container').should('exist');
    cy.dataCy('signup-container').should('not.exist');
    cy.dataCy('emailLogin-container').should('not.exist');
    cy.dataCy('email-input').should('have.value', '');
  });

  it('로그인 실패 - 패스워드 에러 확인', () => {
    cy.dataCy('email-input').type(testUser.email);
    cy.dataCy('continue-button').click();

    cy.dataCy('emailLogin-password-input').type(testUser.wrongPassword); // 틀린 비밀번호
    // 에러메세지 없음
    cy.dataCy('emailLogin-wrongPassword-message').should('not.exist');
    cy.dataCy('emailLogin-submit-button').should('be.enabled'); // 버튼클릭 가능

    cy.dataCy('emailLogin-submit-button').click();

    cy.dataCy('emailLogin-password-input').should('have.value', ''); // 필드 초기화
    cy.dataCy('emailLogin-wrongPassword-message').should('exist');
  });

  it('로그인 성공', () => {
    cy.dataCy('email-input').type(testUser.email);
    cy.dataCy('continue-button').click();

    cy.dataCy('emailLogin-password-input').type(testUser.password);

    // 에러메세지 없음
    cy.dataCy('emailLogin-wrongPassword-message').should('not.exist');
    cy.dataCy('emailLogin-submit-button').should('be.enabled');
    cy.dataCy('emailLogin-submit-button').click();

    cy.url().should('eq', Cypress.env('appUrl') + '/'); // 메인으로 이동 돼야함
    cy.dataCy('header-signout-button').should('exist'); // 로그아웃 버튼 생김
    cy.dataCy('header-login-link').should('not.exist'); // 로그인 링크 사라짐
  });
});
