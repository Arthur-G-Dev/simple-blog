CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL primary key,
    "nick_name" varchar NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "password" text not null,
    "created_at" timestamptz default current_timestamp,
    "updated_at" timestamptz default current_timestamp
);
