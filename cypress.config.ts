import { defineConfig } from 'cypress';
import resetDB from './cypress/tasks/resetDB';
import seedDB from './cypress/tasks/seedDB';

export default defineConfig({
  e2e: {
    baseUrl: process.env.NEXT_PUBLIC_APP_URL,
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // task 등록
      on('task', {
        resetDB,
        seedDB,
      });
    },
    // 테스팅 순서
    // 폴더 내 순서는 01_test.spec.ts 처럼 접두사 사용
    specPattern: [
      'cypress/e2e/main.spec.ts',
      'cypress/e2e/login/*',
      'cypress/e2e/community/*',
      'cypress/e2e/my/*',
    ],
    env: {
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
    },
  },
});
