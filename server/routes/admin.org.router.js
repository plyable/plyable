const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const securityLevel = require('../constants/securityLevel');
const TOTAL_WEEKS = 12;

/**
 * This router is to draw average chart
 */
router.get('/average/chart/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /api/adminorg/average/chart/id GET');

    const id = req.params.id;
    if (req.user.security_level < securityLevel.MANAGER_ROLE) {
        let selectAverage = `
        WITH "temp_avg" AS (
            SELECT
                "us2"."org_id",
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
                AND "rs2"."week" != ( SELECT "current_week" FROM "organization" WHERE "id" = $1 )
                AND "rs2"."week" > ( SELECT ("current_week"-${TOTAL_WEEKS}) AS "min_month" FROM "organization" WHERE "id" = $1 )
        ), "temp_user_count" AS (
            SELECT
                "us2"."org_id",
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
            "tpuc"."user_count",
            "tuc"."total_count", 
            ("tpuc"."user_count"*100)/"tuc"."total_count" AS "percent"
        FROM
            "temp_avg" AS "ta"
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
                ON "ta"."org_id" = "tuc"."id"
            LEFT JOIN "temp_user_count" AS "tpuc"
                ON "tpuc"."org_id" = "tuc"."id"
                    AND "tpuc"."week" = "ta"."week"
        GROUP BY
            "ta"."week",
            "tuc"."total_count",
            "tpuc"."user_count"
        ORDER BY
            "ta"."week" ASC ;
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

/**
 * This router is to download average chart
 */
router.get('/average/all/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /api/adminorg/average/all/id GET');

    const id = req.params.id;
    if (req.user.security_level < securityLevel.MANAGER_ROLE) {
        let selectAverage = `
            WITH "temp_avg" AS (
                SELECT
                    "us2"."org_id",
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
                    AND "rs2"."week" != ( SELECT "current_week" FROM "organization" WHERE "id" = $1 )
            ), "temp_user_count" AS (
                SELECT
                    "us2"."org_id",
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
                "tpuc"."user_count",
                "tuc"."total_count", 
                ("tpuc"."user_count"*100)/"tuc"."total_count" AS "percent"
            FROM
                "temp_avg" AS "ta"
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
                    ON "ta"."org_id" = "tuc"."id"
                LEFT JOIN "temp_user_count" AS "tpuc"
                    ON "tpuc"."org_id" = "tuc"."id"
                        AND "tpuc"."week" = "ta"."week"
            GROUP BY
                "ta"."week",
                "tuc"."total_count",
                "tpuc"."user_count"
            ORDER BY
                "ta"."week" ASC ;
        `;

        pool.query(selectAverage, [
            id
        ]).then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error getting average all data :', error);
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
        ORDER BY
            "id" ASC ;
    `).then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting behaviors for admin :', error);
        res.sendStatus(500);
    });
});

/**
 * This router is for csv file of specific behaviors
 */
router.get('/specific/all/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /api/adminorg/specific/all/id GET');

    const id = req.params.id;
    if (req.user.security_level < securityLevel.MANAGER_ROLE) {
        let selectrSpecific = `
            SELECT
                "bh2"."value",
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
                "bh2"."value",
                "tuc"."total_count"
            HAVING
                "us2"."org_id" = $1
                AND "rs2"."week" != ( SELECT "current_week" FROM "organization" WHERE "id" = $1 )
            ORDER BY
                "rd2"."behavior_id" ASC,
                "rs2"."week" ASC ;
        `;

        pool.query(selectrSpecific, [
            id,
        ]).then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error getting specific all data :', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

/**
 * This router is for specific behavior chart
 */
router.get('/specific/chart/:id/:behaviorId', rejectUnauthenticated, (req, res) => {
    console.log('in /api/adminorg/specific/chart/id/behaviorId GET');

    const id = req.params.id;
    const behaviorId = req.params.behaviorId;
    if (req.user.security_level < securityLevel.MANAGER_ROLE) {
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