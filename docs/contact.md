# Contact API Spec


## Create Contact
```
Endpoint : POST /api/contacts
```

Headers:
- Authorization : token

Request Body : 
```json
    {
        "first_name" : "Yves",
        "last_name"  : "Castillon",
        "email"      : "yves@examples.com",
        "phone"      : "098984322" 
    }
```

Response Body :
```json
    {
        "data" : {
            "id"         : 1,
            "first_name" : "Yves",
            "last_name"  : "Castillon",
            "email"      : "yves@examples.com",
            "phone"      : "098984322"
        }
    }
```
## Get Contact 

```
Endpoint : GET /api/contacts/:contactId
```
Headers:
- Authorization : token

Response Body :
```json
    {
        "data": {
           "id"          : 1,
            "first_name" : "Yves",
            "last_name"  : "Castillon",
            "email"      : "yves@examples.com",
            "phone"      : "098984322"
        }
    }   

```
## Update Contact 
```
Endpoint : PUT /api/contacts/:contactId
```
Headers : 
- Authorization : token

Request body :
```json 
        {
            "id" : 1,
            "first_name" : "Yves",
            "last_name" : "Castillon",
            "email" : "yves@examples.com",
            "phone" : "098984322"
        }
```

Response Body :
```json
    "data": {
            "id" : 1,
            "first_name" : "Yves",
            "last_name" : "Castillon",
            "email" : "yves@examples.com",
            "phone" : "098984322" ,
    }
```
## Remove Contact 
```
Endpoint : DELETE /api/contacts/:contactId
```
Headers : 
- Authorization : token

Response Body :
```json
"data": true,
```

## Search Contact
```
Endpoint : GET /api/contacts
```

Headers : 
- Authorization : token

Query Params : 
- name : string , contact first_name or last_name , optional
- phone : string , contact phone , optional
- email : string , contact email ,`
- page : number , default 1,
- size : number , default 10,

Response Body :
```json
    "data" : [
        {
            "id" : 1,
            "first_name" : "Yves",
            "last_name" : "Castillon",
            "email" : "yves@examples.com",
            "phone" : "098984322" ,
    },
        {
            "id" : 2,
            "first_name" : "Jieyra",
            "last_name" : "De Chattilon",
            "email" : "jiee_jieyra@examples.com",
            "phone" : "09123214" ,
    },
            "paging" : {
             "current_page" : 1,
            "total_page" : 10,
            "size" : 10,
    }
    ]
```