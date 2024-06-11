CREATE TABLE "group_users"(
    "id" bigserial NOT NULL,
    "group_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "group_users" ADD PRIMARY KEY("id");
CREATE TABLE "transaction"(
    "id" bigserial NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "date_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "category_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "shared_group_id" BIGINT NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('PERSONAL', 'SHARED')) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "transaction" ADD PRIMARY KEY("id");
CREATE TABLE "groups"(
    "id" bigserial NOT NULL,
    "created_by" BIGINT NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "groups" ADD PRIMARY KEY("id");
CREATE TABLE "categories"(
    "id" bigserial NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "added_by" VARCHAR(255) CHECK
        ("added_by" IN('ADMIN', 'USER')) NOT NULL,
        "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "categories" ADD PRIMARY KEY("id");
ALTER TABLE
    "categories" ADD CONSTRAINT "categories_name_unique" UNIQUE("name");
CREATE TABLE "user"(
    "id" bigserial NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('ADMIN', 'USER')) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
    ALTER TABLE "user"
    ADD CONSTRAINT unique_email UNIQUE ("email");
CREATE TABLE "refresh_tokens" (
    "id" bigserial NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "is_expired" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE "refresh_tokens" ADD PRIMARY KEY("id");

ALTER TABLE
    "group_users" ADD CONSTRAINT "group_users_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "categories"("id");
ALTER TABLE
    "groups" ADD CONSTRAINT "groups_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "user"("id");
ALTER TABLE
    "group_users" ADD CONSTRAINT "group_users_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_shared_group_id_foreign" FOREIGN KEY("shared_group_id") REFERENCES "groups"("id");
ALTER TABLE
    "categories" ADD CONSTRAINT "categories_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_group_users_updated_at
BEFORE UPDATE ON "group_users"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_transaction_updated_at
BEFORE UPDATE ON "transaction"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_groups_updated_at
BEFORE UPDATE ON "groups"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON "categories"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_refresh_tokens_updated_at
BEFORE UPDATE ON "refresh_tokens"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();


