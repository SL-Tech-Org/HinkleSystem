import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:8080' },
  webServer: {
    command: 'java -jar ../build/libs/hinkle.jar',
    url: 'http://127.0.0.1:8080/actuator/health',
    timeout: 90000,
  },
});
