import { TEST_USER } from '../../constants';

describe('로그인 테스트', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('가입된 이메일을 입력하면 이메일 로그인 페이지가 나타남', () => {
    cy.dataCy('checkEmail-email-input').type(TEST_USER.email); // 가입된 이메일 입력
    cy.dataCy('checkEmail-continue-button').click();

    // 이메일 로그인 컴포넌트 확인
    cy.dataCy('checkEmail-container').should('not.exist');
    cy.dataCy('signup-container').should('not.exist');
    cy.dataCy('emailLogin-container').should('exist');

    // 이전으로 이동 && email field가 초기화 되었는지
    cy.dataCy('prev-button').click();
    cy.dataCy('checkEmail-container').should('exist');
    cy.dataCy('signup-container').should('not.exist');
    cy.dataCy('emailLogin-container').should('not.exist');
    cy.dataCy('checkEmail-email-input').should('have.value', '');
  });

  it('로그인 실패 - 패스워드 에러 확인', () => {
    cy.dataCy('checkEmail-email-input').type(TEST_USER.email);
    cy.dataCy('checkEmail-continue-button').click();

    cy.dataCy('emailLogin-password-input').type(TEST_USER.wrongPassword); // 틀린 비밀번호
    // 에러메세지 없음
    cy.dataCy('emailLogin-wrongPassword-message').should('not.exist');
    cy.dataCy('emailLogin-submit-button').should('be.enabled'); // 버튼클릭 가능

    cy.dataCy('emailLogin-submit-button').click();

    cy.dataCy('emailLogin-password-input').should('have.value', ''); // 필드 초기화
    cy.dataCy('emailLogin-wrongPassword-message').should('exist');
  });

  it('로그인 성공', () => {
    cy.dataCy('checkEmail-email-input').type(TEST_USER.email);
    cy.dataCy('checkEmail-continue-button').click();

    cy.dataCy('emailLogin-password-input').type(TEST_USER.password);

    // 에러메세지 없음
    cy.dataCy('emailLogin-wrongPassword-message').should('not.exist');
    cy.dataCy('emailLogin-submit-button').should('be.enabled');
    cy.dataCy('emailLogin-submit-button').click();

    cy.url().should('eq', Cypress.env('appUrl') + '/'); // 메인으로 이동 돼야함
    cy.dataCy('header-signout-button').should('exist'); // 로그아웃 버튼 생김
    cy.dataCy('header-login-link').should('not.exist'); // 로그인 링크 사라짐
    cy.getCookie('next-auth.session-token').should('exist'); // 쿠키 확인
  });
});
