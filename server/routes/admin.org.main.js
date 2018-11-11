const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log('in /api/adminorg/id GET');
    const id = req.params.id;
    console.log(id);

    let selectAverage = `
        SELECT
            'week' || "rs1"."week" AS "week",
            (
                SELECT
                    ROUND(AVG("rs2"."score"),1) AS "avg"
                FROM 
                    "response" AS "rs2"
                    LEFT JOIN "user" AS "us2"
                        ON "rs2"."user_id" = "us2"."id"
                    LEFT JOIN "behavior" AS "bh2"
                        ON "rs2"."behavior_id" = "bh2"."id"
                WHERE
                    "us2"."org_id" = "us1"."org_id"
                GROUP BY
                    "bh2"."positive",
                    "rs2"."week"
                HAVING
                    "bh2"."positive" = true
                    AND "rs2"."week" = "rs1"."week"
            ) AS "positive",
            (
                SELECT
                    ROUND(AVG("rs2"."score"),1) AS "avg"
                FROM 
                    "response" AS "rs2"
                    LEFT JOIN "user" AS "us2"
                        ON "rs2"."user_id" = "us2"."id"
                    LEFT JOIN "behavior" AS "bh2"
                        ON "rs2"."behavior_id" = "bh2"."id"
                WHERE
                    "us2"."org_id" = "us1"."org_id"
                GROUP BY
                    "bh2"."positive",
                    "rs2"."week"
                HAVING
                    "bh2"."positive" = false
                    AND "rs2"."week" = "rs1"."week"
            ) AS "negative"
        FROM 
            "response" AS "rs1"
            LEFT JOIN "user" AS "us1"
                ON "rs1"."user_id" = "us1"."id"
        WHERE
            "us1"."org_id" = $1
        GROUP BY
            "us1"."org_id",
            "rs1"."week"
        ;
    `;

    pool.query(selectAverage, [
        id
    ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;