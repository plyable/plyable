const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this post router will post user-generated survey results to the database
router.post('/', (req, res) => {
    const newSurveyScore = req.body;
    //only allow one survey result per employee per week
    pool.query(`
        SELECT
            COUNT(*)
        FROM
            "response"
        WHERE
            "user_id" = $1
            AND "week" = ( SELECT "current_week" FROM "organization" WHERE "id" = $2 )
    `, [
            req.user.id,
            req.user.org_id
        ]).then(results => {
            if (results.rows[0].count > 0) {
                res.sendStatus(429);
            } else {
                pool.query(`INSERT INTO "response" ("user_id", "week")
            VALUES ($1,
                    ( SELECT "current_week" FROM "organization" WHERE "id" = $2 )
                ) RETURNING "id";`, [req.user.id, req.user.org_id])
                    .then((results) => {
                        let insert = `INSERT INTO "response_data" ("response_id", "behavior_id", "score") VALUES ($1,$2,$3);`;
                        let array = [];

                        for (let data of newSurveyScore) {
                            const queryValues = [results.rows[0].id, data.id, data.score];
                            array.push(pool.query(insert, queryValues));
                        };//end for/of loop

                        Promise.all(array).then((results) => {
                            res.sendStatus(200);
                        }).catch((error) => {
                            //remove response for that week so that a user may retake their weekly survey if the previous query failed
                            pool.query(`DELETE FROM "response" WHERE "id" = $1;`,[results.rows[0].id]);
                            console.log('Error POSTING survey score to PostgreSQL', error);
                            res.sendStatus(500);
                        });//end POST pool query
                    }).catch((error) => {
                        console.log('Error POSTING id to PostgreSQL', error);
                        res.sendStatus(500)
                    });
            }
        }).catch(error => {
            console.log('Error getting count :', error);
            res.sendStatus(500);
        })
});//end POST call server side

module.exports = router;