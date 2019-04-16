const validate = require('../middleware/validate');
const Tickets = require('../models/tickets');
const router = require('express').Router();

/**
 * @todo - protected routes
 * @todo - fix [PUT] payload validation
*/

/**
 * [POST] /api/tickets
 * @payload - an object with title, description and student_id required props
 * @returns - an array with new ticket ID
*/
router.post('/', validate(Tickets.schema), async ({ body: newTicket }, res) => {
  const [ticketID] = await Tickets.add(newTicket);
  const [ticket] = await Tickets.get(ticketID);
  res.status(201).json(ticket);
});

/**
 * [GET] /api/tickets
 * @returns an array of ticket objects or error
*/
router.get('/', async (req, res) => {
  const tickets = await Tickets.get();
  res.status(200).json(tickets);
});

/**
 * [GET] /api/tickets/:id
 * @returns an object with the ticket props
*/
router.get('/:id', async ({ params: { id } }, res) => {
  const [ticket] = await Tickets.get(id);

  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(404).json({ message: 'The ticket does not exist.' });
  }
});

/**
 * [PUT] ticket
 * @payload - an object with `status` property
 * @returns - updated ticket object
*/
router.put(
  '/:id',
  // validate(Tickets.schema), // fails validation, the payload contains only `status` and `user_id`
  async ({ params: { id }, body: changes }, res) => {
    const count = await Tickets.update(id, changes);
    if (count) {
      const [ticket] = await Tickets.get(id);
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'The ticket does not exist.' });
    }
  }
);

module.exports = router;