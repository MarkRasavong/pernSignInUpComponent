CREATE DATABASE pern_registration_component;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email CITEXT UNIQUE NOT NULL,
  autoritzacio VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);