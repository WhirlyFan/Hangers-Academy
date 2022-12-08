## Messages

## Get all messages for a channel

Returns all messages for a channel specified by its id

- Require Authentication: True
- Require Authorization: True
- Request

  - Method: GET
  - URL: /api/channnels/:channel_id/messages
  - Body: None

- Successful Response

  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "Messages": [
      {
        "id": 1,
        "user_id": 1,
        "channel_id": 2,
        "message_content": "Join AA Hangers",
        "created_at": "2021-11-19 20:39:36",
        "updated_at": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

## Create a Message

Creates and returns a new message

- Require Authentication: True
- Require Authorization: True
- Request

  - Method: POST
  - URL: /api/messages
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "channel_id": 1,
    "user_id": 1,
    "message_content": "Join AA Hangers"
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
    "user_id": 1,
    "channel_id": 1,
    "message_content": "Join AA Hangers",
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
      "message_content": "Message is required"
    }
  }
  ```

## Update a Message

Updates and returns existing message specified by message id

- Require Authentication: True
- Require proper authorization: Message must belong to
  the current user
- Request

  - Method: PUT
  - URL: /api/messages/:messsage_id
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message_content": "Join AA Hangers now!"
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
    "user_id": 1,
    "channel_id": 1,
    "message_content": "Join AA Hangers now!",
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
      "message_content": "Message is required"
    }
  }
  ```

- Error response: Couldn't find a message with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Message couldn't be found",
      "status_code": 404
    }
    ```

## Delete a Message

Deletes an existing message specified by the message id

- Require Authentication: True
- Require proper authorization: Message must belong to
  the current user
- Request

  - Method: DELETE
  - URL: /api/messages/:message_id
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

- Error response: Couldn't find a message with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Message couldn't be found",
      "status_code": 404
    }
    ```
