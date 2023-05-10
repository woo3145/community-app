import { DEFAULT_TAG, SUB_TAG_LENGTH } from '../constants';

describe('DB 초기화 테스트', () => {
  beforeEach(() => {
    cy.task('resetDB');
    cy.task('seedDB');
    cy.visit('/');
  });

  it('성공적으로 DB가 초기화되고 Seed(default Tags)가 추가됨', () => {
    // 태그 개수 확인
    cy.dataCy('category-list')
      .children()
      .should('have.length', SUB_TAG_LENGTH + 2); // + 전체, 추천

    // '카테고리 more 버튼이 정상작동함'
    cy.dataCy('category-list-more').should('not.exist');

    cy.dataCy('more-button').click();
    cy.dataCy('category-list-more')
      .children()
      .should('have.length', SUB_TAG_LENGTH + 2); // + 전체, 추천

    cy.dataCy('more-button').click();
    cy.dataCy('category-list-more').should('not.exist');

    // EmptyPostContainer 가 표시되어야함
    cy.dataCy('empty-post-container').should('exist');
    cy.dataCy('category_5').click();
    cy.dataCy('empty-post-container').should('exist');
  });
});
