## Servers

### Get all Servers that Current User is in

Returns all the servers owned (created) by the current user.

- Require Authentication: True
- Request

  - Method: GET
  - URL: /api/servers/current
  - Body: none

- Successful response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "Servers": [
      {
        "id": 1,
        "owner_id": 1,
        "name": "AA Hangers",
        "private": "false",
        "server_img": "image url",
        "created_at": "2021-11-19 20:39:36",
        "updated_at": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

### Get all servers

- Request

  - Method: GET
  - URL: /api/servers
  - Body: None

- Successful Response

  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "Servers": [
      {
        "id": 1,
        "owner_id": 1,
        "name": "AA Hangers",
        "private": "false",
        "server_img": "image url",
        "created_at": "2021-11-19 20:39:36",
        "updated_at": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

### Get server details by server id

Returns the details of a server specified by its id

- Require Authentication: True
- Request

  - Method: GET
  - URL: /api/servers/:id
  - Body: None

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "id": 1,
    "owner_id": 1,
    "name": "AA Hangers",
    "private": "false",
    "server_img": "image url",
    "Channels": [
      {
        "id": 1,
        "name": "general",
        "Messages": [
          {
            "id": 1,
            "message_content": "sup",
            "user_id": 1
          }
        ]
      }
    ],
    "Users": [
      {
        "id": 1,
        "username": "WhirlyFan"
      }
    ],
    "created_at": "2021-11-19 20:39:36",
    "updated_at": "2021-11-19 20:39:36"
  }
  ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "status_code": 404
    }
    ```

### Create a server

Creates and returns a new server

- Require Authentication: True
- Request

  - Method: POST
  - URL: /api/servers
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "name": "AA Hangers",
    "private": "false",
    "server_img": "url"
  }
  ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "id": 1,
    "owner_id": 1,
    "name": "AA Hangers",
    "private": "false",
    "server_img": "image url",
    "created_at": "2021-11-19 20:39:36",
    "updated_at": "2021-11-19 20:39:36"
  }
  ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Validation Error",
    "status_code": 400,
    "errors": {
      "name": "Name is required",
      "private": "Private status is required",
      "server_img": "Server image is required"
    }
  }
  ```

### Update a server(name only)

Updates and returns existing spot

- Require Authentication: True
- Request

  - Method: GET
  - URL: /api/servers/:id/edit
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "name": "App Academy Hangers"
  }
  ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "id": 1,
    "owner_id": 1,
    "name": "App Academy Hangers",
    "private": "false",
    "server_img": "image url",
    "created_at": "2021-11-19 20:39:36",
    "updated_at": "2021-11-19 20:39:36"
  }
  ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "status_code": 404
    }
    ```

### Delete a server

Deletes an existing server

- Require Authentication: True
- Require proper authorization: Server must belong to
  the current user
- Request

  - Method: DELETE
  - URL: /api/servers/:id
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Succesfully deleted",
    "status_code": 200
  }
  ```

- Error response: Couldn't find a Server with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Server couldn't be found",
      "status_code": 404
    }
    ```
