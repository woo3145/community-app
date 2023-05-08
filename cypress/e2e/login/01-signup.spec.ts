describe('회원가입 테스트', () => {
  before(() => {
    cy.task('resetDB');
    cy.task('seedDB');
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  const testUser = {
    name: 'testUser',
    email: 'test@test.test',
    password: 'qwer1234!',
  };

  it('가입되지 않은 이메일을 입력하면 회원가입 페이지가 나타남', () => {
    const testUser = {
      email: 'test@test.test',
    };
    cy.dataCy('email-input').type(testUser.email); // 가입안된 이메일 입력
    cy.dataCy('continue-button').click();

    // 회원가입 컴포넌트 확인
    cy.dataCy('login-container').should('not.exist');
    cy.dataCy('signup-container').should('exist');
    cy.dataCy('email-login-container').should('not.exist');

    // 이메일칸에 입력한 값이 들어왔는지 && 변경을 막았는지 체크
    cy.dataCy('signup-email-input')
      .should('have.value', testUser.email)
      .should('be.disabled');

    // 이전으로 이동 && email field가 초기화 되었는지
    cy.dataCy('prev-button').click();
    cy.dataCy('login-container').should('exist');
    cy.dataCy('signup-container').should('not.exist');
    cy.dataCy('email-login-container').should('not.exist');
    cy.dataCy('email-input').should('have.value', '');
  });

  it('패스워드 에러메세지 테스트', () => {
    cy.dataCy('email-input').type(testUser.email);
    cy.dataCy('continue-button').click();

    cy.dataCy('signup-name-input').type(testUser.name);

    cy.dataCy('signup-submit-button').should('be.disabled'); // 버튼클릭 막기

    // 패스워드 조건에 맞지 않음
    cy.dataCy('signup-password-input').type('qwer1234');
    cy.dataCy('signup-wrongPassword-message').should('exist');

    cy.dataCy('signup-submit-button').should('be.disabled'); // 버튼클릭 막기

    cy.dataCy('signup-checkPassword-input').type('qwer123');
    cy.dataCy('signup-notMatchPassword-message').should('exist');
    cy.dataCy('signup-checkPassword-input').type('4');
    cy.dataCy('signup-notMatchPassword-message').should('not.exist'); // 패스워드가 일치하면 에러메세지 사라짐

    cy.dataCy('signup-submit-button').should('be.disabled'); // 버튼클릭 막기
  });

  it('서버 에러시 toast 메세지', () => {
    // 서버 500 Error mocking
    cy.intercept(
      {
        method: 'POST',
        url: Cypress.env('appUrl') + '/api/auth/signup',
      },
      {
        // 클라이언트 에러 핸들러가 statusCode를보고 ok값을 판단하기 때문에 반드시 statusCode 변경 필요
        statusCode: 500,
        fixture: '500-error.json',
      }
    );

    cy.dataCy('email-input').type(testUser.email);
    cy.dataCy('continue-button').click();

    cy.dataCy('signup-name-input').type(testUser.name);
    cy.dataCy('signup-password-input').type(testUser.password);
    cy.dataCy('signup-checkPassword-input').type(testUser.password);
    cy.dataCy('signup-submit-button').click();

    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', 'Internal server error');
  });

  it('가입 성공', () => {
    cy.dataCy('email-input').type(testUser.email);
    cy.dataCy('continue-button').click();

    cy.dataCy('signup-name-input').type(testUser.name);
    cy.dataCy('signup-password-input').type(testUser.password);
    cy.dataCy('signup-checkPassword-input').type(testUser.password);

    // 에러메세지 없음
    cy.dataCy('signup-wrongPassword-message').should('not.exist');
    cy.dataCy('signup-notMatchPassword-message').should('not.exist');
    cy.dataCy('signup-successPassword-message').should('exist'); // 패스워드 사용가능 메세지
    cy.dataCy('signup-submit-button').should('be.enabled'); // 버튼클릭 가능

    cy.dataCy('signup-submit-button').click();
    cy.url().should('eq', Cypress.env('appUrl') + '/'); // 메인으로 이동
    cy.dataCy('header-signout-button').should('exist'); // 로그아웃 버튼 생김
    cy.dataCy('header-login-link').should('not.exist'); // 로그인 링크 사라짐
  });
});
