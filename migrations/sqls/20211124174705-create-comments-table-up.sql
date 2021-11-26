CREATE TABLE IF NOT EXISTS "comments" (
    "id" SERIAL primary key,
    "user_id" int4 NOT NULL,
    "article_id" int4 NOT NULL,
    "text" varchar NOT NULL,
    "created_at" timestamptz default current_timestamp,
    "updated_at" timestamptz default current_timestamp
);
