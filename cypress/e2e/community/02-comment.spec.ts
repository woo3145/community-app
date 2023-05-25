import { SUB_TAG_LENGTH, TEST_USER } from '../../constants';

describe('댓글 기능 테스트', () => {
  beforeEach(() => {
    cy.signout();
    cy.login(TEST_USER.email, TEST_USER.password);
    cy.visit('/');
  });

  it('필드 확인', () => {
    cy.dataCy('postCard-0-0').should('exist');
    cy.dataCy('postCard-0-0').click();
    cy.wait(6000);

    // 댓글 입력 폼 존재
    cy.dataCy('createComment-form').should('exist');
    cy.dataCy('createComment-input').should('exist').should('not.be.disabled'); // 로그인 상태임으로 입력가능
    cy.dataCy('createComment-submit').should('exist').should('be.disabled'); // 내용이 없음으로 클릭 불가능

    // Empty Comment 컨테이너 존재
    cy.dataCy('emptyComment-container').should('exist');
  });

  it('댓글 작성 성공', () => {
    cy.dataCy('postCard-0-0').click();
    cy.wait(6000);

    cy.dataCy('createComment-input').type('testComment 1');
    cy.dataCy('createComment-submit').should('not.be.disabled');
    cy.dataCy('createComment-submit').click();

    // 로딩 시 제출 비활성화
    cy.dataCy('createComment-submit').should('be.disabled');
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '처리중 입니다.');

    cy.wait(6000);

    cy.dataCy('comment-0').should('exist').should('contain', 'testComment 1');
    cy.dataCy('post-commentCount').first().should('have.text', '1');
    cy.dataCy('createComment-input').should('have.value', '');
    cy.dataCy('createComment-submit').should('be.disabled');

    // 하나 더생성해둠 (다른 유저의 댓글 일 때 확인하기 위함)
    cy.dataCy('createComment-input').type('testComment 2');
    cy.dataCy('createComment-submit').click();
    cy.wait(6000);
    cy.dataCy('comment-1').should('exist').should('contain', 'testComment 2');
    cy.dataCy('post-commentCount').first().should('have.text', '2');
  });

  it('댓글 삭제 성공', () => {
    cy.dataCy('postCard-0-0').click();
    cy.wait(6000);

    cy.dataCy('comment-1-popup-openButton').should('exist').click();
    cy.dataCy('comment-1-popup-deleteButton').should('exist').click();

    cy.dataCy('deleteComment-modal').should('exist');

    // 취소버튼 클릭
    cy.dataCy('deleteComment-modal-cancel').click();
    cy.dataCy('comment-1').should('exist');

    // 확인버튼 클릭
    cy.dataCy('comment-1-popup-openButton').click();
    cy.dataCy('comment-1-popup-deleteButton').click();
    cy.dataCy('deleteComment-modal-confirm').click();
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '처리중 입니다.');

    cy.wait(6000);

    cy.dataCy('comment-1').should('not.exist');
    cy.dataCy('post-commentCount').first().should('have.text', '1');
  });

  it('로그아웃 상태일때', () => {
    cy.signout();
    cy.visit('/');
    cy.dataCy('postCard-0-0').click();
    cy.wait(6000);

    // 남의 댓글에 팝업창 X
    cy.dataCy('comment-0').should('exist').should('contain', 'testComment 1');
    cy.dataCy('comment-0-popup-openButton').should('not.exist');

    // 댓글 작성 불가
    cy.dataCy('createComment-input').should('be.disabled');
    cy.dataCy('createComment-submit').should('be.disabled');
  });
});
