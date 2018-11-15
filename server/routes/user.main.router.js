const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/chart', (req, res) => {
    console.log('in /api/main/chart/orgId');

    let selectAvg = `
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
            ) AS "negative"
        FROM
            "temp_avg" AS "ta"
        GROUP BY
            "ta"."week"
        ORDER BY
            "ta"."week" ASC ;
    `;

    pool.query(selectAvg, [
        req.user.org_id
    ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting organization chart data :', error);
        res.sendStatus(500);
    });
});

router.get('/survey/status', (req, res) => {
    console.log('in /api/main/survey/status/userId GET');

    let selectSurveyStatus = `
        SELECT 
            COALESCE("rs"."week", -1) AS "survey_week"
        FROM 
            "user" AS "us"
            LEFT JOIN "organization" AS "og"
                ON "us"."org_id" = "og"."id"
            LEFT OUTER JOIN "response" AS "rs"
                ON "us"."id" = "rs"."user_id"
                    AND "og"."current_week" = "rs"."week"
        WHERE 
            "us"."id" = $1 ;
    `;

    pool.query(selectSurveyStatus, [
        req.user.id
    ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting user survey status :', error);
    });
});

module.exports = router;