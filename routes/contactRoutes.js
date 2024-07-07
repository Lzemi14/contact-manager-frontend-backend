const express = require('express');
const router = express.Router();
const {
  getcontacts,
  createcontact,
  getcontact,
  updatecontact,
  deletecontact,
} = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandddler');

router.use(validateToken);
router.route('/').get(getcontacts).post(createcontact);
router.route('/:id').get(getcontact).put(updatecontact).delete(deletecontact);

module.exports = router;

