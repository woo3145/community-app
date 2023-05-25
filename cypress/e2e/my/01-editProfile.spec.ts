import { TEST_USER } from '../../constants';

describe('프로필 수정 기능 테스트', () => {
  beforeEach(() => {
    cy.signout();
    cy.login(TEST_USER.email, TEST_USER.password);
    cy.visit('/my');
    cy.wait(2000);
  });

  it('필드 확인', () => {
    cy.dataCy('editProfile-button').should('exist').click();
    cy.dataCy('editProfile-modal').should('exist');
    cy.dataCy('nameType-false').should('exist');
    cy.dataCy('nameType-true').should('exist');
    cy.dataCy('userName-input').should('exist');
    cy.dataCy('description-input').should('exist');

    // 변경사항이 없으면 api요청없이 닫힘
    cy.dataCy('nameType-true').click();
    cy.dataCy('nameType-false').click();
    cy.dataCy('modal-button').click();
    cy.dataCy('editProfile-modal').should('not.exist');
  });

  it('닉네임 수정', () => {
    cy.dataCy('userName').should('have.text', 'testUser');
    cy.dataCy('editProfile-button').should('exist').click();

    // nameType: 닉네임 클릭 시 이전에 설정한 닉네임으로 바뀜
    cy.dataCy('nameType-true').click();
    cy.dataCy('userName-input').should('not.have.text', TEST_USER.name);
    // 기본 클릭 시 이름으로 바뀜
    cy.dataCy('nameType-false').click();
    cy.dataCy('userName-input').should('have.value', TEST_USER.name);

    // 닉네임 클릭 후 2 ~ 8글자 사이에만 확인버튼 활성화
    cy.dataCy('nameType-true').click();
    cy.dataCy('userName-input').clear();
    for (let i = 1; i <= 9; ++i) {
      cy.dataCy('userName-input').type(i.toString());
      if (2 <= i && i < 9) {
        cy.dataCy('modal-button').should('not.be.disabled');
      } else {
        cy.dataCy('modal-button').should('be.disabled');
      }
    }

    // type:닉네임 && "1234" 로 변경
    cy.dataCy('userName-input').clear().type('1234');
    cy.dataCy('modal-button').click();

    cy.dataCy('modal-button').should('be.disabled');
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '처리중 입니다.');
    cy.wait(6000);
    cy.dataCy('editProfile-modal').should('not.exist'); // 모달 닫힘
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '성공적으로 업데이트 되었습니다.');

    cy.dataCy('userName').should('have.text', '1234');

    // type: 이름 으로 변경
    cy.dataCy('editProfile-button').should('exist').click();
    cy.dataCy('nameType-false').click();
    cy.dataCy('modal-button').click();

    cy.dataCy('modal-button').should('be.disabled');
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '처리중 입니다.');
    cy.wait(6000);
    cy.dataCy('editProfile-modal').should('not.exist'); // 모달 닫힘
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '성공적으로 업데이트 되었습니다.');

    cy.dataCy('userName').should('have.text', 'testUser');
  });

  it('한줄소개 수정', () => {
    cy.dataCy('description').should('have.text', '');

    cy.dataCy('editProfile-button').should('exist').click();

    // 한줄소개 길이
    cy.dataCy('description-input').type('123456789');
    cy.dataCy('description-length').should('have.text', '9/150');

    // 개행문자 여러개 있으면 2개만 빼고 제거 && 개행문자와 공백을 섞어써도 잘 제거됨
    cy.dataCy('description-input').clear();
    cy.dataCy('description-input').type('1\n2\n\n3\n\n\n4\n\n\n\n   5');

    cy.dataCy('modal-button').click();
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '처리중 입니다.');
    cy.wait(6000);
    cy.dataCy('editProfile-modal').should('not.exist'); // 모달 닫힘
    cy.get('div.Toastify__toast-body')
      .should('exist')
      .should('contain', '성공적으로 업데이트 되었습니다.');

    cy.dataCy('description').should('have.text', '1\n2\n\n3\n\n4\n\n5');
  });
});
