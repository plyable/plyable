const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const TOTAL_WEEKS = 12;

/**
 * GET route template
 */
router.get('/chart/:behaviorId', rejectUnauthenticated, (req, res) => {
    console.log('in /api/main/chart GET');

    const behaviorId = req.params.behaviorId;
    let selectrSpecific = `
        SELECT
            "rs2"."week",
            ROUND(AVG("rd2"."score"), 1) AS "avg",
            ROUND(AVG("rd2"."expect_score"), 1) AS "expect_avg",
            COUNT(DISTINCT "rs2"."user_id") AS "user_count",
            "tuc"."total_count", 
            (COUNT(DISTINCT "rs2"."user_id")*100)/"tuc"."total_count" AS "percent"
        FROM
            "response" AS "rs2"
            LEFT JOIN "response_data" AS "rd2"
                ON "rs2"."id" = "rd2"."response_id"
            LEFT JOIN "user" AS "us2"
                ON "rs2"."user_id" = "us2"."id"
            LEFT JOIN "behavior" AS "bh2"
                ON "rd2"."behavior_id" = "bh2"."id"
            LEFT JOIN (
                SELECT
                    "og"."id",
                    COUNT("us"."id") AS "total_count"
                FROM
                    "organization" AS "og"
                    LEFT JOIN "user" AS "us"
                        ON "og"."id" = "us"."org_id"
                GROUP BY
                    "og"."id"
                HAVING
                    "og"."id" = $1
            ) AS "tuc"
                ON "us2"."org_id" = "tuc"."id"
        GROUP BY
            "us2"."org_id",
            "rd2"."behavior_id",
            "rs2"."week",
            "tuc"."total_count"
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
            AND "rs2"."week" != ( SELECT "current_week" FROM "organization" WHERE "id" = $1 )
            AND "rs2"."week" > ( SELECT ("current_week"-${TOTAL_WEEKS}) AS "min_month" FROM "organization" WHERE "id" = $1 )
        ORDER BY
            "rs2"."week" ASC ;
    `;

    pool.query(selectrSpecific, [
        req.user.org_id,
        behaviorId
    ]).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting specific chart data for users :', error);
        res.sendStatus(500);
    });
});

router.get('/survey/status', rejectUnauthenticated, (req, res) => {
    console.log('in /api/main/survey/status GET');

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