# Executable Stories

You write Vitest tests with plain-English steps. Each run turns those steps into an HTML report that anyone on the team can read, so your tests double as documentation.

## Before you start

You need Node 22.12 or newer and pnpm. Check both:

```bash
node -v
pnpm -v
```

## Run it

```bash
pnpm install
pnpm test
```

Open `reports/index.html` in your browser to see every test on one page. Each test file also gets its own page in `reports/files/`.

To see changes as you work, run:

```bash
pnpm dev
```

Vitest reruns your tests on each save, and the browser tab reloads with the new report.

## Your first story

`src/basic.test.ts` holds the smallest working story:

```ts
it('fetches a user and their orders', async ({ task }) => {
  story.init(task);

  story.arrange('a user id');
  const id = '1';

  story.act('fetch the user and their orders');
  const { user, orders } = await fetchUserAndOrders(id);

  story.assert('the user is Alice with one order of 99.99');
  expect(user.name).toBe('Alice');
});
```

`story.init(task)` adds the test to the report. Each `story.arrange`, `story.act` and `story.assert` call adds a step, and the code below it does the work. If you prefer Given/When/Then, use `story.given`, `story.when` and `story.then`.

To add your own story, create a new `*.test.ts` file in `src/`. Vitest finds it and adds it to the report without any config change.

## Files

| File | What it holds |
| --- | --- |
| `src/basic.test.ts` | the minimal example above |
| `src/kitchen-sink.story.test.ts` | every `story.*` method in one file; copy the parts you need |
| `vitest.config.ts` | two reporters: one writes the combined report, the other writes a page per file |

## Skills for Claude Code

The `.claude/skills` folder holds skills that teach Claude Code how to write stories. To add more or update them:

```bash
npx skills add https://github.com/jagreehal/executable-stories
```

| Skill | Use it for |
| --- | --- |
| `vitest-story-api` | writing story tests |
| `vitest-reporter-setup` | changing reporter options |
| `vitest-converting-tests` | turning existing Vitest tests into stories |
| `story-tdd` | red-green-refactor, starting from a failing story |
| `spec-grilling` | turning a vague ticket into scenarios |
| `bug-to-scenario` | turning a bug report into a failing scenario |
| `scenarios-to-tickets` | filing tickets for gaps a run found |
| `playwright-*` | the same ideas for Playwright tests |
