# ER Diagram

## Main Entities

- Users
- Workers
- Clients
- Skills
- Worker_Skills
- Availability
- Placements
- Contracts

## Relationships

Users
    |
    | 1 : 0..1
    |
Clients


Workers
    |
    | 1 : Many
    |
Availability


Workers
    |
    | Many : Many
    |
Worker_Skills
    |
    | Many : 1
    |
Skills


Workers
    |
    | 1 : Many
    |
Placements
    |
    | Many : 1
    |
Clients


Placements
    |
    | 1 : Many
    |
Contracts
## Relationship Summary

1. One User can be associated with one Client account.
2. One Worker can have multiple Availability records.
3. Workers and Skills have a many-to-many relationship through Worker_Skills.
4. One Worker can have multiple Placements.
5. One Client can have multiple Placements.
6. A Placement can have Contract records.
## Visual ER Diagram

```mermaid
erDiagram

    USERS ||--o| CLIENTS : "has account"

    WORKERS ||--o{ AVAILABILITY : "has"

    WORKERS ||--o{ WORKER_SKILLS : "has"
    SKILLS ||--o{ WORKER_SKILLS : "contains"

    WORKERS ||--o{ PLACEMENTS : "assigned"
    CLIENTS ||--o{ PLACEMENTS : "requests"

    PLACEMENTS ||--o{ CONTRACTS : "has"

    USERS {
        BIGINT id PK
        VARCHAR name
        VARCHAR email UK
        VARCHAR password_hash
        VARCHAR role
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    WORKERS {
        BIGINT id PK
        VARCHAR full_name
        VARCHAR phone UK
        VARCHAR email
        TEXT address
        VARCHAR gender
        INT experience_years
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    CLIENTS {
        BIGINT id PK
        BIGINT user_id FK
        VARCHAR full_name
        VARCHAR phone UK
        VARCHAR email
        TEXT address
        TEXT requirement
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    SKILLS {
        BIGINT id PK
        VARCHAR name UK
        TEXT description
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    WORKER_SKILLS {
        BIGINT id PK
        BIGINT worker_id FK
        BIGINT skill_id FK
        INT experience_years
        TIMESTAMP created_at
    }

    AVAILABILITY {
        BIGINT id PK
        BIGINT worker_id FK
        DATE available_from
        DATE available_to
        VARCHAR status
        TEXT notes
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    PLACEMENTS {
        BIGINT id PK
        BIGINT worker_id FK
        BIGINT client_id FK
        DATE placement_date
        DECIMAL fee
        VARCHAR status
        BOOLEAN replacement_requested
        TEXT notes
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    CONTRACTS {
        BIGINT id PK
        BIGINT placement_id FK
        DATE start_date
        DATE end_date
        TEXT terms
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
```