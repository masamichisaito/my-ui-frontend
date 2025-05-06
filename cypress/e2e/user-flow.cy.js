const API_URL = Cypress.env('API_URL') || 'http://localhost:3000';

beforeEach(() => {
  cy.request('DELETE', `${API_URL}/test/reset-users`);
});

describe('ユーザー登録フロー', () => {
  it('正しい情報で登録→一覧に表示', () => {

    cy.visit('http://localhost:5173');
    cy.contains('登録').should('be.visible').click();

    cy.get('input[name=email]').type('test@e2e.com');
    cy.get('input[name=name]').type('E2E太郎');
    cy.get('input[name=age]').type('25');
    cy.get('input[name=hobby]').type('ゲーム');

    cy.contains('確認').should('be.visible').click();

    cy.url().should('include', '/confirm'); // 遷移確認
    cy.get('button').contains('登録').click();

    // 完了画面で「トップページへ戻る」をクリック
    cy.contains('トップページへ戻る').should('be.visible').click();

    cy.get('button').contains('登録一覧を見る').click();

    cy.contains('一覧').should('be.visible').click();
    cy.contains('E2E太郎').should('exist');
  });

  it('空欄では登録できない（バリデーションエラー表示）', () => {
    cy.visit('http://localhost:5173');
    cy.contains('登録').click();
    cy.contains('確認画面へ').click();
    cy.contains('メールアドレスは必須です').should('be.visible');
    cy.contains('氏名は必須です').should('be.visible');
  });

  it('不正なメール形式でエラーが出ること', () => {
    cy.visit('http://localhost:5173');
    cy.contains('登録').click();
    cy.get('input[name=email]').type('invalidmail');
    cy.contains('確認').click();
    cy.contains('正しいメールアドレスを入力してください').should('exist');
  });

  it('複数ユーザー登録で全員表示される', () => {
    // 1人目登録
    cy.visit('http://localhost:5173');
    cy.contains('登録').click();
    cy.get('input[name=email]').type('user1@e2e.com');
    cy.get('input[name=name]').type('ユーザー1');
    cy.get('input[name=age]').type('20');
    cy.get('input[name=hobby]').type('読書');
    cy.contains('確認').click();
    cy.contains('登録').click();
    cy.contains('トップページへ戻る').click();

    // 2人目登録
    cy.contains('登録').click();
    cy.get('input[name=email]').type('user2@e2e.com');
    cy.get('input[name=name]').type('ユーザー2');
    cy.get('input[name=age]').type('22');
    cy.get('input[name=hobby]').type('音楽');
    cy.contains('確認').click();
    cy.contains('登録').click();
    cy.contains('トップページへ戻る').click();

    // 一覧確認
    cy.get('button').contains('登録一覧を見る').click();
    cy.contains('一覧').click();
    cy.contains('ユーザー1').should('exist');
    cy.contains('ユーザー2').should('exist');
  });

  it('確認画面から戻ると入力値が保持されている', () => {
    cy.visit('http://localhost:5173');
    cy.contains('登録').click();
    cy.get('input[name=email]').type('test@e2e.com');
    cy.get('input[name=name]').type('太郎');
    cy.get('input[name=age]').type('28');
    cy.get('input[name=hobby]').type('ランニング');
    cy.contains('確認').click();
    cy.contains('戻る').click();

    cy.get('input[name=name]').should('have.value', '太郎');
  });

  describe('ユーザー削除のE2Eテスト', () => {
      beforeEach(() => {
        // テスト用データをAPIで登録
        cy.request('POST', `${API_URL}/test/reset-users`, {
          users: [{
              email: 'delete@test.com',
              name: 'delete',
              age: 28,
              hobby: '将棋',
              isTestData: true
            }
        ]});
  
        // 一覧画面に遷移
        cy.visit('http://localhost:5173');
        cy.get('button').contains('登録一覧を見る').click();
        cy.contains('一覧').click();
      });
  
      it('ユーザーを削除できること', () => {
        cy.contains('delete').should('exist');
        cy.contains('削除').click();
        cy.on('window:confirm', () => true); // 確認ダイアログOK
        cy.contains('delete').should('not.exist');
      });
    });
  });
