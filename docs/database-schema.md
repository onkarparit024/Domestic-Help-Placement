# Database Schema

## 1. users

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| name | VARCHAR(100) | | NOT NULL |
| email | VARCHAR(150) | UNIQUE | NOT NULL |
| password_hash | VARCHAR(255) | | NOT NULL |
| role | VARCHAR(20) | | NOT NULL |
| status | VARCHAR(20) | | DEFAULT 'active' |
| created_at | TIMESTAMP | | NOT NULL |
| updated_at | TIMESTAMP | | NOT NULL |

Roles:
- admin
- staff
- client


## 2. workers

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| full_name | VARCHAR(100) | | NOT NULL |
| phone | VARCHAR(15) | UNIQUE | NOT NULL |
| email | VARCHAR(150) | | NULL |
| address | TEXT | | NOT NULL |
| gender | VARCHAR(20) | | NULL |
| experience_years | INT | | DEFAULT 0 |
| status | VARCHAR(30) | | DEFAULT 'available' |
| created_at | TIMESTAMP | | NOT NULL |
| updated_at | TIMESTAMP | | NOT NULL |


## 3. clients

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| user_id | BIGINT | FK | REFERENCES users(id) |
| full_name | VARCHAR(100) | | NOT NULL |
| phone | VARCHAR(15) | UNIQUE | NOT NULL |
| email | VARCHAR(150) | | NULL |
| address | TEXT | | NOT NULL |
| requirement | TEXT | | NOT NULL |
| status | VARCHAR(30) | | DEFAULT 'active' |
| created_at | TIMESTAMP | | NOT NULL |
| updated_at | TIMESTAMP | | NOT NULL |


## 4. skills

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| name | VARCHAR(100) | UNIQUE | NOT NULL |
| description | TEXT | | NULL |
| status | VARCHAR(20) | | DEFAULT 'active' |
| created_at | TIMESTAMP | | NOT NULL |
| updated_at | TIMESTAMP | | NOT NULL |


## 5. worker_skills

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| worker_id | BIGINT | FK | REFERENCES workers(id) |
| skill_id | BIGINT | FK | REFERENCES skills(id) |
| experience_years | INT | | DEFAULT 0 |
| created_at | TIMESTAMP | | NOT NULL |

Unique constraint:

UNIQUE(worker_id, skill_id)


## 6. availability

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| worker_id | BIGINT | FK | REFERENCES workers(id) |
| available_from | DATE | | NOT NULL |
| available_to | DATE | | NULL |
| status | VARCHAR(20) | | DEFAULT 'available' |
| notes | TEXT | | NULL |
| created_at | TIMESTAMP | | NOT NULL |
| updated_at | TIMESTAMP | | NOT NULL |


## 7. placements

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| worker_id | BIGINT | FK | REFERENCES workers(id) |
| client_id | BIGINT | FK | REFERENCES clients(id) |
| placement_date | DATE | | NOT NULL |
| fee | DECIMAL(10,2) | | DEFAULT 0 |
| status | VARCHAR(30) | | DEFAULT 'pending' |
| replacement_requested | BOOLEAN | | DEFAULT FALSE |
| notes | TEXT | | NULL |
| created_at | TIMESTAMP | | NOT NULL |
| updated_at | TIMESTAMP | | NOT NULL |


## 8. contracts

| Column | Type | Key | Constraint |
|---|---|---|---|
| id | BIGINT | PK | AUTO_INCREMENT |
| placement_id | BIGINT | FK | REFERENCES placements(id) |
| start_date | DATE | | NOT NULL |
| end_date | DATE | | NULL |
| terms | TEXT | | NULL |
| status | VARCHAR(20) | | DEFAULT 'active' |
| created_at | TIMESTAMP | | NOT NULL |
| updated_at | TIMESTAMP | | NOT NULL |


# Relationships

- Clients.user_id → Users.id
- Availability.worker_id → Workers.id
- Worker_Skills.worker_id → Workers.id
- Worker_Skills.skill_id → Skills.id
- Placements.worker_id → Workers.id
- Placements.client_id → Clients.id
- Contracts.placement_id → Placements.id


# Common Requirements

- Primary keys must be unique.
- Important identifiers should be unique where required.
- Required fields should not be NULL.
- Important records should have status.
- Important records should have created_at and updated_at.
- Important status and financial changes should be traceable.
- Finalized transactions should not be silently deleted.