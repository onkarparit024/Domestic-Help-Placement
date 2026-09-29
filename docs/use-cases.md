# Use Cases

## UC-01: User Login

### Actor
Admin / Staff / Client

### Description
User logs into the system using valid credentials.

### Main Flow
1. User opens the login page.
2. User enters email/username and password.
3. System validates the credentials.
4. System identifies the user's role.
5. System redirects the user to the appropriate dashboard.

### Alternative Flow
- If credentials are invalid, the system displays an error message.

---

## UC-02: Manage Worker

### Actor
Admin / Staff

### Description
Authorized user manages domestic worker records.

### Main Flow
1. User opens Worker Management.
2. User creates a new worker or searches an existing worker.
3. User enters or updates worker information.
4. System validates the information.
5. System saves the worker record.
6. Worker status/history is maintained.

---

## UC-03: Manage Client

### Actor
Admin / Staff

### Description
Authorized user manages client records and requirements.

### Main Flow
1. User opens Client Management.
2. User creates or searches a client.
3. User enters client information.
4. User records the client's domestic-help requirement.
5. System validates the information.
6. System saves the client record.

---

## UC-04: Manage Skills

### Actor
Admin / Staff

### Description
Authorized user manages skills used for worker matching.

### Main Flow
1. User opens Skills Management.
2. User creates or updates a skill.
3. System validates the skill.
4. System saves the skill.

---

## UC-05: Manage Availability

### Actor
Admin / Staff

### Description
Authorized user manages worker availability information.

### Main Flow
1. User selects a worker.
2. User records availability details.
3. System validates the information.
4. System saves the availability record.

---

## UC-06: Match Worker With Client

### Actor
Staff / Operator

### Description
Staff searches for workers matching a client's requirements.

### Main Flow
1. Staff opens a client requirement.
2. Staff searches available workers.
3. System displays matching workers.
4. Staff reviews worker details.
5. Staff selects a suitable worker.
6. Matching information is recorded.

---

## UC-07: Verify Worker

### Actor
Staff / Admin

### Description
Authorized user completes worker verification before placement.

### Main Flow
1. User opens the worker verification section.
2. User checks required worker information/documents.
3. User records verification status.
4. System saves the verification status.
5. Worker becomes available for the next placement stage according to the recorded status.

---

## UC-08: Create Placement

### Actor
Staff / Admin

### Description
Staff creates a placement after matching and verification.

### Main Flow
1. Staff selects the client.
2. Staff selects the matched worker.
3. System validates the placement information.
4. Staff creates the placement.
5. System records the placement status.
6. Placement history is maintained.

---

## UC-09: Manage Contract and Fee

### Actor
Staff / Admin

### Description
Authorized user records contract and placement fee information.

### Main Flow
1. User opens a placement.
2. User enters contract information.
3. User records applicable fee/payment information.
4. System validates the information.
5. System saves the financial and contract records.

---

## UC-10: Replacement Request

### Actor
Staff / Admin / Client

### Description
A replacement request is recorded when replacement is required.

### Main Flow
1. User opens the existing placement.
2. User creates a replacement request.
3. System records the request.
4. Staff reviews the request.
5. Replacement status is updated.
6. History is maintained.

---

## UC-11: Search and History

### Actor
Admin / Staff

### Description
Authorized users search records and view their history.

### Main Flow
1. User opens the required management section.
2. User enters search/filter criteria.
3. System returns matching records.
4. User opens a record.
5. System displays relevant details and history.

---

## UC-12: Dashboard and Reports

### Actor
Admin / Authorized Staff

### Description
Authorized users view business information through dashboards and reports.

### Main Flow
1. User opens Dashboard/Reports.
2. System retrieves transaction data.
3. User applies available filters.
4. System displays the requested information.
5. Reports are based on application transaction data.

---

## UC-13: Role-Based Authorization

### Actor
System

### Description
The system restricts protected operations according to user roles.

### Main Flow
1. User requests a protected operation.
2. System identifies the user's role.
3. System checks authorization.
4. If authorized, the operation is allowed.
5. If unauthorized, access is denied.

---

## UC-14: Audit and Status History

### Actor
System

### Description
Important status and financial changes are traceable.

### Main Flow
1. An important record is created or updated.
2. System records the relevant change.
3. System maintains status/history information.
4. Authorized users can retrieve the history.