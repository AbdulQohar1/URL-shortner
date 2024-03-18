const  express = require('express');
const router  = express.Router();
// const nanoid = require('nanoid');
// require('../models/url')

const {
  getAllUrls,
  getUrl,
  createUrl,
  updateUrl,
  deleteUrl,
} = require('../controller/urls');

router.route('/').post(createUrl).get(getAllUrls);
router.route('/:id').get(getUrl).patch(updateUrl).delete(deleteUrl);

module.exports = router;
