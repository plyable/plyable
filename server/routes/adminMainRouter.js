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

//this query will make post calls from member-generated data, creating new organizations
router.post('/', (req, res) => {
    const newOrganization = req.body;
    const queryValues = [newOrganization.name];
    pool.query(`INSERT INTO "organization" ("name")
    VALUES ($1);`, queryValues)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('Error POSTING organization to PostgreSQL', error);
            res.sendStatus(500);
        })//end POST pool query
});//end POST call server side

module.exports = router;