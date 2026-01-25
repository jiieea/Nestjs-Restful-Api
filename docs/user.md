# User api spec

## Register User
```
 Endpoint : POST /api/users
```

Request
```json
    {
        "username" : "Jieyra",
        "password" : "secret password",
        "name" : "Jieyra De Chattilon",
    }
```
Response Body : (Success)
```json
    {
        "data": {
            "username" : "Jieyra",
            "name" : "Jieyra De Chattilon",
        }
    }
```

Response Body : (Failed)
```json
    {
        "data": {
            "errors": "Usename already registered",
        }
    }
```

## Login User
```
Endpoint : POST /api/users/login
```

Request
```json
    {
        "username" : "Jieyra",
        "password" : "secret password",
    }
```
Response Body : (Success)
```json
    {
        "data": {
            "username" : "Jieyra",
            "name" : "Jieyra De Chattilon",
            "token": "token_id_generated",
        }
    }
```

Response Body : (Failed)
```json
    {
        "data": {
            "errors": "Username already registered",
        }
    }
```
## Get User
```
Endpoint : GET /api/users/current
```

Headers : 
- Authorization: token

Response Body : (Success)
```json
    {
        "data": {
            "username" : "Jieyra",
            "name" : "Jieyra De Chattilon",
        }
    }
```

Response Body : (Failed)
```json
    {
        "data": {
            "errors": "Unauthorized User",
        }
    }
```

## Update User
```
Endpoint: PATCH /api/users/current
```

Request
```json
    {
        "password" : "secret password", // optional , if u want to change password
        "name" : "Jieyra De Chattilon", // optional  , if u want to change name
    }
```
Response Body : (Success)
```json
    {
        "data": {
            "username" : "Jieyra",
            "name" : "Jieyra De Chattilon",
        }
    }
```

## Logout User

```
Endpoint: DELETE /api/users/current
```

Response Body : (Success)
```json
    {
      "data" : true
    }
```