const Tickets = require('../../../models/tickets');
const Users = require('../../../models/users');

describe('tickets', () => {
  beforeAll(async() => {
    await Users.add({
      email: 'devdeskapp@gmail.com',
      username: 'admin',
      password: 'super22unicorndragon@55',
      admin: true
    });
    await Users.add({
      email: 'pavos@example.com',
      username: 'pav0s',
      password: 'yeeyee'
    });
    await Users.add({
      email: 'macbethjonathan@gmail.com',
      username: 'macjabeth',
      password: 'supersecurepasswd'
    });
  });
  afterAll(async () => {
    Tickets.clear();
    Users.clear();
  });

  it('should add new tickets', async () => {
    await Tickets.add({
      status: 'resolved',
      title: 'problem1',
      description: 'big problem',
      tried: 'cry',
      student_id: 1,
      admin_id: 2
    });
    await Tickets.add({
      status: 'open',
      title: 'problem2',
      description: 'big problem',
      tried: 'cry',
      student_id: 1,
      admin_id: 2
    });

    const tickets = await Tickets.get();
    expect(tickets).toHaveLength(2);
  });

  it('should find a ticket', async () => {
    const [ticket] = await Tickets.filter({ title: 'problem1' });
    expect(ticket).toBeDefined();
    expect(ticket).toHaveProperty('status', 'resolved');
  });

  it('should update a ticket', async () => {
    const count = await Tickets.update(1, { tried: 'not enough' });
    expect(count).toBe(1);
  });

  it('should delete a ticket', async () => {
    const count = await Tickets.remove(1);
    expect(count).toBe(1);
  });

  it('should clear the tickets', async () => {
    await Tickets.clear();

    const tickets = await Tickets.get();

    expect(tickets).toHaveLength(0);
  });
});