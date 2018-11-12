const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this query will make a call to the database to retrieve organizations from the ERD table "organization"
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "organization"
    ORDER BY "id";`)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('error getting member', error);
        });//end GET pool query
});//end GET call server side

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;