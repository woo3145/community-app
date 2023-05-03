describe('DB 초기화 테스트', () => {
  beforeEach(() => {
    cy.task('resetDB');
    cy.task('seedDB');
    cy.visit('/');
  });

  it('성공적으로 DB가 초기화되고 Seed(default Tags)가 추가됨', () => {
    // 태그 확인
  });
});
