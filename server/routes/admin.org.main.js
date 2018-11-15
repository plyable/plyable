const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/average/:id', (req, res) => {
    console.log('in /api/adminorg/average/id GET');
    const id = req.params.id;
    if (req.user && req.user.security_level < 1) {
        let selectAverage = `
            WITH "temp_avg" AS (
                SELECT
                    "rs2"."week",
                    ROUND(AVG("rd2"."score"), 1) AS "avg",
                    "bh2"."positive"
                FROM
                    "response" AS "rs2"
                    LEFT JOIN "response_data" AS "rd2"
                        ON "rs2"."id" = "rd2"."response_id"
                    LEFT JOIN "user" AS "us2"
                        ON "rs2"."user_id" = "us2"."id"
                    LEFT JOIN "behavior" AS "bh2"
                        ON "rd2"."behavior_id" = "bh2"."id"
                GROUP BY
                    "us2"."org_id",
                    "rs2"."week",
                    "bh2"."positive"
                HAVING
                    "us2"."org_id" = $1
            ), "temp_user_count" AS (
                SELECT
                    "rs2"."week",
                    COUNT(DISTINCT "rs2"."user_id") AS "user_count"
                FROM
                    "response" AS "rs2"
                    LEFT JOIN "response_data" AS "rd2"
                        ON "rs2"."id" = "rd2"."response_id"
                    LEFT JOIN "user" AS "us2"
                        ON "rs2"."user_id" = "us2"."id"
                    LEFT JOIN "behavior" AS "bh2"
                        ON "rd2"."behavior_id" = "bh2"."id"
                GROUP BY
                    "us2"."org_id",
                    "rs2"."week"
                HAVING
                    "us2"."org_id" = $1
            )
            SELECT
                "ta"."week",
                (
                    SELECT
                        "avg"
                    FROM
                        "temp_avg"
                    WHERE
                        "week" = "ta"."week"
                        AND "positive" = true
                ) AS "positive",
                (
                    SELECT
                        "avg"
                    FROM
                        "temp_avg"
                    WHERE
                        "week" = "ta"."week"
                        AND "positive" = false
                ) AS "negative",
                (
                    SELECT
                        "user_count"
                    FROM
                        "temp_user_count" AS "tuc"
                    WHERE
                        "tuc"."week" = "ta"."week"
                ) AS "user_count"
            FROM
                "temp_avg" AS "ta"
            GROUP BY
                "ta"."week"
            ORDER BY
                "ta"."week" ASC
        `;

        pool.query(selectAverage, [
            id
        ]).then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error getting average chart data :', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.get('/behavior', (req, res) => {
    console.log('in /api/adminorg/behavior GET');

    pool.query(`
        SELECT
            *
        FROM
            "behavior"
        ;
    `).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting behaviors for admin :', error);
        res.sendStatus(500);
    });
});

router.get('/specific/all/:id', (req, res) => {
    console.log('in /api/adminorg/specific/all/id GET');

    const id = req.params.id;
    if (req.user && req.user.security_level < 1) {
        let selectrSpecific = `
            SELECT
                "bh2"."value",
                "rs2"."week",
                ROUND(AVG("rd2"."score"), 1) AS "avg",
                COUNT(DISTINCT "rs2"."user_id") AS "user_count"
            FROM
                "response" AS "rs2"
                LEFT JOIN "response_data" AS "rd2"
                    ON "rs2"."id" = "rd2"."response_id"
                LEFT JOIN "user" AS "us2"
                    ON "rs2"."user_id" = "us2"."id"
                LEFT JOIN "behavior" AS "bh2"
                    ON "rd2"."behavior_id" = "bh2"."id"
            GROUP BY
                "us2"."org_id",
                "rd2"."behavior_id",
                "rs2"."week",
                "bh2"."value"
            HAVING
                "us2"."org_id" = $1
            ORDER BY
                "rd2"."behavior_id" ASC,
                "rs2"."week" ASC
            ;
        `;

        pool.query(selectrSpecific, [
            id,
        ]).then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error getting specific chart data :', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.get('/specific/:id/:behaviorId', (req, res) => {
    console.log('in /api/adminorg/specific/id/behaviorId GET');

    const id = req.params.id;
    const behaviorId = req.params.behaviorId;
    if (req.user && req.user.security_level < 1) {
        let selectrSpecific = `
            SELECT
                "rs2"."week",
                ROUND(AVG("rd2"."score"), 1) AS "avg",
                COUNT(DISTINCT "rs2"."user_id") AS "user_count"
            FROM
                "response" AS "rs2"
                LEFT JOIN "response_data" AS "rd2"
                    ON "rs2"."id" = "rd2"."response_id"
                LEFT JOIN "user" AS "us2"
                    ON "rs2"."user_id" = "us2"."id"
                LEFT JOIN "behavior" AS "bh2"
                    ON "rd2"."behavior_id" = "bh2"."id"
            GROUP BY
                "us2"."org_id",
                "rd2"."behavior_id",
                "rs2"."week"
            HAVING
                "us2"."org_id" = $1
                AND "rd2"."behavior_id" = (
                    SELECT 
                        CASE 
                            WHEN 0 = CAST($2 AS INTEGER) THEN "id"
                        ELSE
                            CAST($2 AS INTEGER) END AS "id"
                    FROM "behavior" 
                    ORDER BY "id" ASC 
                    LIMIT 1
                )
            ORDER BY
                "rs2"."week" ASC
            ;
        `;

        pool.query(selectrSpecific, [
            id,
            behaviorId
        ]).then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error getting specific chart data :', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;