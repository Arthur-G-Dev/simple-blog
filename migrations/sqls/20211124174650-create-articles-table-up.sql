CREATE TABLE IF NOT EXISTS "articles" (
    "id" SERIAL primary key,
    "user_id" int4 NOT NULL,
    "title" varchar NOT NULL,
    "text" varchar NOT NULL,
    "category" varchar NOT NULL,
    "created_at" timestamptz default current_timestamp,
    "updated_at" timestamptz default current_timestamp
);
