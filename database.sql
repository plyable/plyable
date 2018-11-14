-- Name Database "plyable"

CREATE TABLE "organization" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"created" TIMESTAMP DEFAULT NOW(),
	"current_week" INT DEFAULT 0,
	"collecting_data" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "behavior" (
	"id" SERIAL PRIMARY KEY,
	"value" VARCHAR(10),
	"definition" VARCHAR(50),
	"context" VARCHAR(50),
	"positive" BOOLEAN
);

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"org_id" INT REFERENCES "organization",
	"password" VARCHAR(1000),
	"email" VARCHAR(30) UNIQUE NOT NULL,
	"security_level" INT DEFAULT 2,
	"temp_key" VARCHAR(1000),
	"temp_key_timeout" TIMESTAMP
);

CREATE TABLE "response" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"week" INT NOT NULL
);

CREATE TABLE "response_data" (
	"id" SERIAL PRIMARY KEY,
	"behavior_id" INT REFERENCES "behavior",
	"response_id" INT REFERENCES "response",
	"score" INT NOT NULL
);
