const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    res.sendStatus(200);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;