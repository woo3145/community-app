import { DEFAULT_TAG } from '../constants';

describe('DB 초기화 테스트', () => {
  beforeEach(() => {
    cy.task('resetDB');
    cy.task('seedDB');
    cy.visit('/');
  });

  it('성공적으로 DB가 초기화되고 Seed(default Tags)가 추가됨', () => {
    // Subtags + 전체 + 추천 - ParentTags
    const subTagLength = DEFAULT_TAG.length + 2 - 3;

    // 태그 개수 확인
    cy.dataCy('category-list').children().should('have.length', subTagLength);

    // more 버튼
    cy.dataCy('category-list-more').should('not.exist');
    cy.dataCy('more-button').click();
    cy.dataCy('category-list-more')
      .children()
      .should('have.length', subTagLength);
  });
});
