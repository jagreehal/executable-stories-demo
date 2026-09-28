import { defineConfig } from 'vitest/config';
import { StoryReporter } from 'executable-stories-vitest/reporter';

// Every *.test.ts is picked up automatically; no per-file config needed.
// reports/index.html       — all tests in one page
// reports/files/<name>.html — one page per test file (files/index.html links to each)
export default defineConfig({
  test: {
    reporters: [
      'default',
      new StoryReporter({ formats: ['html'], outputDir: 'reports' }),
      new StoryReporter({
        formats: ['html'],
        outputDir: 'reports/files',
        output: { mode: 'colocated', colocatedStyle: 'flat' },
      }),
    ],
  },
});
