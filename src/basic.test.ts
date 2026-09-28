import { describe, expect, it } from 'vitest';
import { story } from 'executable-stories-vitest';

type User = { id: string; name: string };
type Order = { id: number; total: number };

async function fetchUserAndOrders(id: string): Promise<{ user: User; orders: Order[] }> {
  return { user: { id, name: 'Alice' }, orders: [{ id: 1, total: 99.99 }] };
}

describe('Hello World', () => {
  it('fetches a user and their orders', async ({ task }) => {
    story.init(task);

    story.arrange('a user id');
    const id = '1';

    story.act('fetch the user and their orders');
    const { user, orders } = await fetchUserAndOrders(id);

    story.assert('the user is Alice with one order of 99.99');
    expect(user.name).toBe('Alice');
    expect(orders[0].total).toBe(99.99);
  });
});
