const express = require('express');

const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/:page', viewController.sendInitialPage);

router.get('/subpage/:subpage', viewController.sendSubpage);

module.exports = router;