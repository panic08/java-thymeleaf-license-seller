CREATE TABLE IF NOT EXISTS orders_table(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    data TEXT NOT NULL,
    created_at BIGINT NOT NULL
);