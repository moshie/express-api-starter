### Me

Endpoint: **/users/me**
Method: **GET**
Authorization: **Yes**
**Response**

```json
{
    "data": {
        "user": {
            "first_name": "john",
            "last_name": "doe",
            "email": "john.doe@example.com",
            "created_at": "2018-03-01 20:10:50"
        }
    }
}
```

------

### Roles

Endpoint: **/users/roles**
Method: **GET**
Authorization: **Yes**
**Response**

```json
{
    data: {
        roles: [{
            display_name: "Administrator",
            name: "admin",
            description: "Website Administrator"
        }]
    }
}
```

------

### Permissions

Endpoint: **/users/permissions**
Method: **GET**
Authorization: **Yes**
**Response**

```json
{
    data: {
        permissions: [{
            display_name: "Can Edit Posts",
            name: "can_edit_posts",
            description: "Enables the user to edit posts"
        }]
    }
}
```

------

### Confirmed

Endpoint: **/users/confirmed**
Method: **GET**
Authorization: **Yes**
**Response**

```json
{
    "data": {
        "confirmed": true
    }
}
```

------

### Store

Endpoint: **/users/confirmed**
Method: **POST**
Authorization: **Yes**
Role: **admin**
**Request**

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "password": "strongPassword",
    "password_confirmation": "strongPassword"
}
```

**Response**

```json
{
    "data": { 
        "message": "User Created"
       }
}
```

------

### Index

Endpoint: **/users**
Method: **GET**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    "data": [{
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com"
    }]
}
```

------

### Show

Endpoint: **/users/:email**
Method: **GET**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    data: {
        user: {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com"
        }
    }
}
```

------

### Update

Endpoint: **/users/:email**
Method: **PUT**
Authorization: **Yes**
Role: **admin**
**Request**

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "password": "strongPassword",
    "password_confirmation": "strongPassword"
}
```

**Response**

```json
{
    data: {
        user: {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com"
        }
    }
}
```

------

### Remove

Endpoint: **/users/:email**
Method: **DELETE**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    "data": {
        "message": "User removed successfully"
    }
}
```

------

### Get User Roles

Endpoint: **/:email/roles**
Method: **GET**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    "data": {
        roles: [{
            display_name: "Administrator",
            name: "admin",
            description: "Website Administrator"
        }]
    }
}
```

------

### Assign a user a role

Endpoint: **/:email/roles/:role_name**
Method: **PUT**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    
}
```

------

### Revoke a role from a user

Endpoint: **/:email/roles/:role_name**
Method: **DELETE**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    
}
```

------

### Get a users current permissions

Endpoint: **/:email/permissions**
Method: **GET**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    data: {
        permissions: [{
            display_name: "Can Edit Posts",
            name: "can_edit_posts",
            description: "Enables the user to edit posts"
        }]
    }
}
```

------

### Check if user is confirmed

Endpoint: **/:email/confirmed**
Method: **GET**
Authorization: **Yes**
Role: **admin**
**Response**

```json
{
    data: {
        confirmed: true
    }
}
```

