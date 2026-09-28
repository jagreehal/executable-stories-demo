import { describe, expect, it } from 'vitest';
import { story } from 'executable-stories-vitest';

const TINY_PNG =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADElEQVR42mP8z8BQDwAFgwJ/lYd9KgAAAABJRU5ErkJggg==';

story.feature({
  kind: 'ability',
  title: 'Every executable-stories-vitest API in one place',
  narrative: `
    Open this file's HTML report to see every story method the Vitest adapter
    can record.

    - **Docs**, including a Markdown section and a Markdown attachment
    - *Step styles*, from Given/When/Then through the AAA aliases
    - Attachments and a hand-rolled trace
  `,
  tags: ['kitchen-sink'],
  glossary: [
    {
      term: 'step',
      definition:
        'A Given/When/Then (or alias) marker that the reporter turns into a documented scenario step.',
    },
  ],
});

describe('Kitchen sink', () => {
  it('records every doc method and step keyword', ({ task }) => {
    story.init(task, {
      tags: ['docs', 'smoke'],
      ticket: 'KS-001',
      covers: ['src/kitchen-sink.story.test.ts'],
      meta: { area: 'docs', priority: 'high' },
    });

    story.note(
      'This scenario exercises every story.* doc method so the generated HTML includes all of them.',
    );
    story.tag('smoke');
    story.tag(['regression', 'critical']);
    story.kv({ label: 'Ticket', value: 'KS-001' });
    story.table({
      label: 'Report config',
      columns: ['Setting', 'Value'],
      rows: [
        ['Framework', 'Vitest'],
        ['API version', '8.9'],
      ],
    });
    story.json({
      label: 'Config',
      value: { reporter: true, formats: ['html'] },
    });
    story.code({
      label: 'Snippet',
      content: 'const x = 1;\nconst y = 2;',
      lang: 'typescript',
    });
    story.table({
      label: 'Method checklist',
      columns: ['Method', 'Used'],
      rows: [
        ['story.note', 'Yes'],
        ['story.tag', 'Yes'],
        ['story.kv', 'Yes'],
        ['story.json', 'Yes'],
        ['story.code', 'Yes'],
        ['story.table', 'Yes'],
        ['story.link', 'Yes'],
        ['story.section', 'Yes'],
        ['story.mermaid', 'Yes'],
        ['story.screenshot', 'Yes'],
        ['story.video', 'Yes'],
        ['story.html', 'Yes'],
        ['story.state', 'Yes'],
        ['story.custom', 'Yes'],
        ['story.setup', 'Yes'],
        ['story.context', 'Yes'],
        ['story.execute', 'Yes'],
        ['story.action', 'Yes'],
        ['story.verify', 'Yes'],
      ],
    });
    story.link({
      label: 'Docs',
      url: 'https://github.com/jagreehal/executable-stories',
    });
    story.section({
      title: 'What Markdown can carry',
      markdown: `
        A section is the place for explanation a note cannot carry: *why* a
        rule comes first, the trap a reader is likely to fall into, a worked
        example.

        - **Bold** and *italic* render
        - Lists stay lists
        - A GFM table is for prose that happens to line up

        | You call | The report shows |
        | --- | --- |
        | story.section | Rendered Markdown |
        | story.note | Plain text |
        | story.table | A data table |

        > The title is the heading. Do not add hash headings inside the body.
      `,
    });
    story.mermaid({
      code: 'graph LR\n  A[story.init] --> B[docs]\n  B --> C[steps]',
      title: 'Simple diagram',
    });
    story.screenshot({
      path: '../screenshots/kitchen.png',
      alt: 'Kitchen sink',
    });
    story.video({
      path: '../videos/kitchen.webm',
      caption: 'Placeholder walkthrough',
    });
    story.html({
      title: 'Inline embed',
      height: 120,
      content: `<!doctype html>
<html><body style="font:14px sans-serif;margin:12px">
  <strong>story.html()</strong> embeds self-contained markup in a sandboxed iframe.
</body></html>`,
    });
    story.state({ label: 'Basket', value: { items: [], total: 0 } });
    story.state({
      label: 'Basket',
      value: { items: [{ sku: 'KS-1', qty: 1 }], total: 12 },
    });
    story.custom({ type: 'sink-meta', data: { version: 2, methods: 19 } });

    story.given('all doc methods were called', {
      note: 'Inline StoryDocs attach to this step instead of the story.',
      json: { label: 'Precondition', value: { ready: true } },
    });
    story.section({
      title: 'Attached to this step',
      markdown:
        'This section sits **under the step** that came before it, not on the scenario.',
    });
    story.given('a second given renders as And');
    story.when('steps are recorded');
    story.then(
      'generated doc contains note, table, kv, json, code, link, section, mermaid, screenshot, video, html, state, custom',
    );
    story.and(
      'the section renders markdown: emphasis, a list, a quote, and a table',
    );
    story.and(
      'step keywords include given, when, then, and, but, arrange, act, assert, setup, context, execute, action, and verify',
    );
    story.but('no real screenshot or video asset is required');
    story.arrange('arrange alias works');
    story.act('act alias works');
    story.assert('assert alias works');
    story.setup('setup alias works');
    story.context('context alias works');
    story.execute('execute alias works');
    story.action('action alias works');
    story.verify('verify alias works');

    expect(true).toBe(true);
  });

  it('shows a before/after table instead of kv pairs', ({ task }) => {
    story.init(task, {
      tags: ['docs', 'teaching'],
      covers: ['src/kitchen-sink.story.test.ts'],
    });

    story.given('an empty basket');
    story.when('the shopper adds a hoodie');
    story.then('the basket holds one item and the total is £12');
    story.table({
      label: 'What changed',
      columns: ['Who', 'Before', 'After'],
      rows: [
        ['Items', 'none', 'hoodie × 1'],
        ['Total', '£0', '£12'],
      ],
    });
    expect(true).toBe(true);
  });

  it('records callback steps, wrappers, and timers', ({ task }) => {
    story.init(task, {
      tags: ['callbacks'],
      ticket: 'KS-002',
    });

    const operands = story.fn('Given', 'two numbers', () => ({ a: 5, b: 3 }));

    const token = story.startTimer();
    const sum = story.when('they are added', () => operands.a + operands.b);
    story.endTimer(token);

    story.expect('the result is 8', () => {
      expect(sum).toBe(8);
    });
  });

  it('attaches a file and a hand-rolled span waterfall', ({ task }) => {
    story.init(task, {
      tags: ['attachments', 'trace'],
      ticket: 'KS-003',
      traceUrlTemplate: 'https://example.com/traces/{traceId}',
    });

    story.given('a checkout request is in flight');
    story.attach({
      name: 'cart.png',
      mediaType: 'image/png',
      body: TINY_PNG,
      encoding: 'BASE64',
      fileName: 'cart.png',
    });
    story.attach({
      name: 'notes.md',
      mediaType: 'text/markdown',
      body: '## Notes\n\nRetried once. The report previews **markdown** attachments inline.',
      encoding: 'IDENTITY',
      fileName: 'notes.md',
    });

    story.when('pricing and cart load finish');
    story.attachSpans(
      [
        {
          spanId: 'a',
          name: 'POST /checkout',
          startTimeMs: 0,
          durationMs: 240,
          status: 'ok',
        },
        {
          spanId: 'b',
          parentSpanId: 'a',
          name: 'pricing.applyDiscount',
          startTimeMs: 40,
          durationMs: 80,
          status: 'ok',
        },
        {
          spanId: 'c',
          parentSpanId: 'a',
          name: 'db.cart.load',
          startTimeMs: 10,
          durationMs: 95,
          status: 'ok',
        },
      ],
      { traceId: '11112222333344445555666677778888', spanId: 'a' },
    );

    story.then(
      'the report shows a png, a markdown preview, and a trace waterfall',
    );
    expect(true).toBe(true);
  });

  it.todo('records a planned scenario that has no steps yet');

  const cases = [
    { input: 1, expected: 2 },
    { input: 2, expected: 4 },
  ];

  it.for(cases)(
    'doubles $input to $expected',
    ({ input, expected }, { task }) => {
      story.init(task, { tags: ['outline'] });

      story.given(`the input is ${input}`);
      story.when('the doubler runs');
      story.then(`the result is ${expected}`);
      expect(input * 2).toBe(expected);
    },
  );
});
