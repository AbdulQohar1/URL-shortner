const  express = require('express');
const router  = express.Router();
const nanoid = require('nanoid');

require('../models/url')

const {
  getAllURLs,
  getURL,
  createURL,
  updateURL,
  deleteURL,
} = require('../controller/urls');

router.route('/').post(createURL).get(getAllURLs);
router.route('/:id').get(getURL).patch(updateURL).delete(deleteURL);

module.exports = router;
