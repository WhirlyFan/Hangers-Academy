## Channels

### Get all channels by server id

- Request

  - Method: GET
  - URL: /api/servers/:server_id/channels or /api/channels
  - Body: None

- Successful Response

  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "Channels": [
      {
        "id": 1,
        "name": "general",
        "server_id": 1,
        "created_at": "2021-11-19 20:39:36",
        "updated_at": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

### Create a channel

Creates and returns a new channel

- Require Authentication: True
- Require Authorization: True
- Request

  - Method: POST
  - URL: /api/channels
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "name": "general",
    "server_id": 1
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
    "name": "general",
    "server_id": 1,
    "created_at": "2021-11-19 20:39:36",
    "updated_at": "2021-11-19 20:39:36"
  }
  ```

* Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {
      "name": "Name must be less than 25 characters",
      "server_id": "Server couldn't be found"
    }
  }
  ```

### Update a channel

Updates and returns a channel

- Require Authentication: True
- Require Authorization: True
- Request

  - Method: PUT
  - URL: /api/channels/:channel_id
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "name": "general",
    "server_id": 1
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
    "name": "general",
    "server_id": 1
  }
  ```

* Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {
      "name": "Name must be less than 25 characters",
      "server_id": "Server couldn't be found"
    }
  }
  ```

### Delete a channel

- Require Authentication: True
- Require Authorization: True
- Request

  - Method: DELETE
  - URL: /api/channels/:channel_id
  - Headers:
    - Content-Type: application/json
  - Body: None

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Successfully deleted channel",
    "status_code": 200
  }
  ```

* Error response: Couldn't find a Channel with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Channel couldn't be found",
    "status_code": 404
  }
  ```
