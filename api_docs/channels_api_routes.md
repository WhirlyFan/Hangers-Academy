## Channels

### Get all channels by server id

- Request

  - Method: GET
  - URL: /api/servers/:server_id/channels
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
  - URL: /api/servers/:server_id/channels
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
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Street address is required",
        "private": "City is required",
        "server_img": "State is required"
      }
    }
    ```

### Update a channel

### Delete a channel
