import { SUB_TAG_LENGTH, TEST_USER } from '../../constants';

describe('글 작성 테스트', () => {
  beforeEach(() => {
    cy.signout();
    cy.login(TEST_USER.email, TEST_USER.password);
    cy.visit('/write');
  });

  it('필드 확인', () => {
    cy.dataCy('title-input').should('exist');
    cy.dataCy('content-input').should('exist');
    cy.dataCy('tag-add-button_1').should('exist');
    cy.dataCy('tag-add-button_2').should('exist');
    cy.dataCy('tag-add-button_1').click();
    cy.dataCy('subTags-container')
      .children()
      .should('have.length', SUB_TAG_LENGTH);
  });

  it('Tag Picker 동작확인', () => {
    cy.dataCy('tag-add-button_1').click();

    cy.dataCy('tagList-tag_4').click();
    cy.dataCy('tagList-tag_5').click();
    cy.dataCy('tagList-tag_6').click();

    // 3개이상 선택시 toast 에러메세지
    cy.dataCy('tagList-tag_7').click();
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '최대 3개만 선택 가능합니다.');

    cy.dataCy('tagList-tag_6').click();
    cy.dataCy('modal-button').click();

    // 태그가 잘 선택됨
    cy.dataCy('selectedTag-container').children().should('have.length', 2);

    cy.dataCy('selectedTag_4').should('exist');
    cy.dataCy('selectedTag_5').should('exist');

    // 선택 된 태그 삭제기능
    cy.dataCy('selectedTag_4-remove-button').click();
    cy.dataCy('selectedTag-container').children().should('have.length', 1);
    cy.dataCy('selectedTag_4').should('not.exist');
    cy.dataCy('selectedTag_5').should('exist');
    cy.dataCy('selectedTag_5-remove-button').click();
    cy.dataCy('selectedTag_5').should('not.exist');
  });

  it('글 작성 성공', () => {
    // 태그 선택이 안됨
    cy.dataCy('submit-button').should('be.disabled');
    cy.dataCy('title-input').type('test');
    cy.dataCy('content-input').type('test');
    cy.dataCy('submit-button').should('not.be.disabled');
    cy.dataCy('submit-button').click();

    // toast 에러메세지
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '태그의 수가 잘못되었습니다.');

    cy.dataCy('tag-add-button_1').click();
    cy.dataCy('tagList-tag_4').click();
    cy.dataCy('tagList-tag_5').click();
    cy.dataCy('modal-button').click();

    cy.dataCy('submit-button').click();
    cy.wait(3000);
    cy.url().should('contain', '/post/'); // 작성한 글 페이지로 이동
  });

  it('로그인 안된 상태면 login 페이지로 리다이렉트', () => {
    cy.signout();
    cy.visit('/write');
    cy.url().should('eq', Cypress.env('appUrl') + '/login');
  });
});
