CREATE TABLE IF NOT EXISTS "categories" (
    "id" SERIAL primary key,
    "name" varchar NOT NULL,
    "created_at" timestamptz default current_timestamp,
    "updated_at" timestamptz default current_timestamp
);

INSERT INTO "categories"("name") VALUES ('criminal'), ('politics'), ('environment'), ('local');
