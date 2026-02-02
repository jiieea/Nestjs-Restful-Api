# address api spec

## Create Address
```
Endpoint : POST /api/contacts/:contactId/addresses
```

Headers:
- Authorization : token

Request Body : 
```json
    {
    "Street"        : "Nama Jalan",
        "City"          : "Nama kota",
        "Province"      : "Nama Provinsi",
        "Country"       : "Nama Negeara",
        "Postal_Code"   : "1223343"
    }
```

Response Body  :
```json
    {
      data : {
        "id"            : 1,
        "Street"        : "Nama Jalan",
        "City"          : "Nama kota",
        "Province"      : "Nama Provinsi",
        "Country"       : "Nama Negeara",
        "Postal_Code"   : "1223343"
      }
    }

```

## Get Address 
```
Endpoint : GET /api/contacts/:contactId/addresses/:addressId
```

Headers:
- Authorization : token

Response Body  :
```json
    {
       data : {
        "id"            : 1,
        "Street"        : "Nama Jalan",
        "City"          : "Nama kota",
        "Province"      : "Nama Provinsi",
        "Country"       : "Nama Negeara",
        "Postal_Code"   : "1223343"
       }
    }

```


## Update Address 
```
Endpoint : PUT /api/contacts/:contactId/addresses/:addressId
```

Headers:
- Authorization : token

Request Body : 
```json
    {
        "Street"        : "Nama Jalan",
        "City"          : "Nama kota",
        "Province"      : "Nama Provinsi",
        "Country"       : "Nama Negeara",
        "Postal_Code"   : "1223343"
    }
```

Response Body  :
```json
    {
      data : {
        "id"            : 1,
        "Street"        : "Nama Jalan",
        "City"          : "Nama kota",
        "Province"      : "Nama Provinsi",
        "Country"       : "Nama Negeara",
        "Postal_Code"   : "1223343"
      }
    }

```


## Remove Address
```
Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId
```

Headers:
- Authorization : token

Response Body  :
```json
    {
      "data" : true
    }

```

## List Address
```
Endpoint : GET /api/contacts/:contactId/addresses
```

Headers:
- Authorization : token

Request Body : 
```json
    {
        "Street"        : "Nama Jalan",
        "City"          : "Nama kota",
        "Province"      : "Nama Provinsi",
        "Country"       : "Nama Negeara",
        "Postal_Code"   : "1223343"
    }
```

Response Body  :
```json
    {
      data : {
        "id"            : 1,
        "Street"        : "Nama Jalan",
        "City"          : "Nama kota",
        "Province"      : "Nama Provinsi",
        "Country"       : "Nama Negeara",
        "Postal_Code"   : "1223343"
      }
    }

```
