Eventually This will be moved to a headless cms..

## Auth

POST - /auth/login - **Authenticate User**
POST - /auth/register - **Register a new User**
POST - /auth/forgot - **Send Forgotten Password email**
POST - /auth/reset - **Reset Users Password**
GET - /auth/confirm/:token - **Confirm Users email address**

-----

## Users

**Resource**
POST - /users - **Create a new User**
GET - /users - **Get all users** - TODO: Pagination
GET - /users/:user_id - **Get User by id** 
PUT - /users/:user_id - **Update User**
DELETE - /users/:user_id - **Delete User** - TODO Cascade

**Other**
GET - /users/me - **Get authorised user**
GET - /users/confirmed - **Check if authorised user is confirmed**
GET - /users/:user_id/confirmed - **Checks if user is confirmed or not** - TODO: Implement Route

**Roles**
GET - /users/roles - **Get current user's roles**
GET - /users/:user_id/roles - **Get roles belonging to a particular user** - TODO: Implement Route
PUT - /users/:user_id/roles/:role_name - **Assign a user a role** - TODO: Implement Route
DELETE - /users/:user_id/roles/:role_name - **Revoke a user a role** - TODO: Implement Route

**Permissions**
GET - /users/permissions - **Get current user's permissions**
GET - /users/:user_id/permissions - **Get a users current permissions** - TODO: Implement Route

-----

## Roles

**Resource**
POST - /roles - **Creates a new role**
GET - /roles - **Get's all roles** - TODO: Pagination
GET - /roles/:role_name - **Get a Particular role**
PUT - /roles/:role_name - **Update a role**
DELETE - /roles/:role_name - **Delete a role** - TODO: Cascade

**Users**
PUT - /roles/:role_name/users - **Assign many users to a role**
PUT - /roles/:role_name/users/:user_id - **Assign user to a role**
DELETE - /roles/:role_name/users/:user_id - **Revoke user from a role**

**Permissions**
GET - /roles/:role_name/permissions - **Get all permissions on a role**
PUT - /roles/:role_name/permissions - **Assign many permissions to a role** - TODO: Implement Route
PUT - /roles/:role_name/permissions/:permission_name - **Assign a permission to a role** - TODO: Implement Route
DELETE - /roles/:role_name/permissions/:permisson_name - **Revoke permission from a role** - TODO: Implement Route

-----

## Permissions

**Resource**
POST - /permissions/ - **Create a new Permission**
GET - /permissions/ - **Get all permissions** - TODO: Pagination
GET - /permissions/:permission_name - **Get a permission**
PUT - /permissions/:permission_name - **Update a permission**
DELETE - /permissions/:permission_name - **Delete a permission**
