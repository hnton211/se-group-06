# Api

**Description**

- fastify framework based backend api application
- postgresql database
- JWT Token for Authentication

#

**Test application:**

- yarn install
- yarn start

#

**Base URL:**

```
http://localhost:3001/
```

## USER APIs

**Log in**

- Method: POST

```
${baseUrl}/signin
```

- Sample Body

######

```
{
    "email": "mqk@gmail.com",
    "password": "12345678"
}
```

#

**Sign up**

- Method: POST

```
${baseUrl}/user/create
```

- Sample Body

######

```
{
    "username": "maiquockhanh"
    "email": "mqk@gmail.com",
    "password": "12345678",
    "firstname": "Mai",
    "lastname": "Quoc Khanh"
}
```

#

**Get info**

- Method: POST

```
${baseUrl}/user/info
```

- Sample Body

######

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzNTkxMzY5MiwiZXhwIjoxNjM2MDAwMDkyfQ.e93GXte2A3sEtBZzz2YGg9xFFnXh1i17LltzljrsKZM"
}
```

#

**Edit name**

- Method: PUT

```
${baseUrl}/user/update/name
```

- Sample Body

######

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzNTkxMzY5MiwiZXhwIjoxNjM2MDAwMDkyfQ.e93GXte2A3sEtBZzz2YGg9xFFnXh1i17LltzljrsKZM",
    "firstName": "Mai",
    "lastName": "Quoc Khanh"
}
```

#

**Edit email**

- Method: PUT

```
${baseUrl}/user/update/email
```

- Sample Body

######

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzNTkxMzY5MiwiZXhwIjoxNjM2MDAwMDkyfQ.e93GXte2A3sEtBZzz2YGg9xFFnXh1i17LltzljrsKZM",
    "email": "mqk@gmail.com"
}
```

#

**Edit password**

- Method: PUT

```
${baseUrl}/user/update/password
```

- Sample Body

######

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzNTkxMzY5MiwiZXhwIjoxNjM2MDAwMDkyfQ.e93GXte2A3sEtBZzz2YGg9xFFnXh1i17LltzljrsKZM",
    "password": "12345678",
    "newPassword": "123456"
}
```

#
